console.log(process.argv)
// when we run node someLearning.js with only above line of code it gives an array with the following elements
// [path of node.exe, path of this file]
// if we add anything to the command that gets added like node someLearning.js dadfs wrwt, output will be
// [path of node.exe, path of this file, dadfs, wrwt]


const fs = require("fs");

fs.createReadStream(__filename).pipe(process.stdout);

setTimeout(() => {
    // process.stdout.write is same as console.log
    process.stdout.write("Hooray")
}, 1000)
