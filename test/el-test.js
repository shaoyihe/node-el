/**
 * Created by heshaoyi on 4/18/16.
 */

"use strict";

var should = require("should"),
    el = require("../lib/el");

describe('el', function () {
    it('#obj-arr', function () {
        var a = {};
        el(a, "[first][next][second][2][w]", 234);
        a.should.have.properties({first: {next: {second: [, , {w: 234}]}}})
    });

    it('#not-support', function () {
        var a = {};
        (function () {
            el(a, "[first][2]", 234);
        }).should.throw();

        (function () {
            el(a, "[first][2][1][0]", 234);
        }).should.throw();
    });
});