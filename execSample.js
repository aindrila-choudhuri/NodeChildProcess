const { stdout, stderr } = require("process");

const exec = require("child_process").exec;

exec("cat execSample.js", (err, stdout, stderr) => {
    console.log("Catted file", stdout);
});