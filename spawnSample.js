const spawn = require("child_process").spawn;

//process.execPath will basically give the full path of binary of node

if (process.argv[2] === 'child') {
    // it means it's the child process
    console.log("I am inside child")
} else{
    const child = spawn(process.execPath, [__filename, 'child']);
    // child.stdout.on('data', (data) => {
    //     console.log("from the child: ", data.toString())
    // })
    child.stdout.pipe(process.stdout);
}
