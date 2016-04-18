/**
 * Created by heshaoyi on 3/29/16.
 */
"use strict";

const el_regex = /(^[^[]+)|\[([^\]]+)\]/g;
const ERROR_NOT_SUPPORT_MSG = "error format, not support continuous 3 number or only the last is number , eg : [3][2][1] or [first][1]";

function getMatches(string, regex) {
    var matches = [];
    var match;
    while (!!(match = regex.exec(string))) {
        matches.push(match[1] || match[2]);
    }
    return matches;
}

/**
 * simalar el
 * @param context
 * @param k
 * @param value
 * @returns {*}
 */
function update(context, k, value) {
    var k_arr = getMatches(k, el_regex);
    if (k_arr.length == 1) {
        context[k_arr] = value;
        return context;
    }

    var last = context;
    var lastIndex;

    for (let i = 0; i < k_arr.length; ++i) {
        let k_v = k_arr[i];
        if (i == k_arr.length - 1) {
            if (Array.isArray(last)) {
                if (last.length > lastIndex) {
                    last[lastIndex] = last[lastIndex] || {};
                    last[lastIndex][k_v] = value;
                } else {
                    var local = {};
                    local[k_v] = value;
                    last.push(local);
                }
            } else if (typeof last === "object") {
                last[k_v] = value;
            }
        } else {
            let next = k_arr[i + 1];
            if (Array.isArray(last)) {
                throw new Error(ERROR_NOT_SUPPORT_MSG);
            } else if (typeof last === "object") {
                if (isNaN(next)) {
                    last = last[k_v] = last[k_v] || {};
                } else {
                    last = last[k_v] = last[k_v] || new Array(parseInt(next) + 1);
                    lastIndex = next;
                    ++i;
                    if (i == k_arr.length - 1) {
                        throw new Error(ERROR_NOT_SUPPORT_MSG);
                    }
                }
            }
        }
    }
    return context;
}

module.exports = update;