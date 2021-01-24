const fs = require('fs');
const Promise = require("bluebird");
Promise.reduce(["childprocesses.js", "exec.js", "someLearning.js"], function(total, fileName) {
    return fs.readFileAsync(fileName, "utf8").then(function(contents) {
        return total + parseInt(contents, 10);
    });
}, 0).then(function(total) {
    //Total is 30
    console.log("total: ", total);
});