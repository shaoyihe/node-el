# Node el

## Installation

     npm install node-el
     
## Usage
     
     var el = require("node-el");
     var before = {};
     el(before, "[first][next][second][2][w]", 234);
     console.log(require("util").inspect(before, {depth: null})); // {first: {next: {second: [, , {w: 234}]}}}