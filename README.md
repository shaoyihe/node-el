# Node el

## Installation

     npm install el
     
## Usage
     
     var el = require("el");
     var before = {};
     el(before, "[first][next][second][2][w]", 234);
     console.log(a); // {first: {next: {second: [, , {w: 234}]}}}