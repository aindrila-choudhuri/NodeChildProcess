const cp = require("child_process"); //built in module

//exec options
const exec_options = {
    cwd: null, //current working directory
    env: null,
    encoding: "utf8",
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: "SIGTERM"
};

// exec - this method creates a shell first and executes the command, it's asynchronous
// child_process.exec(command[, options][,callback])
// command - this is the mandatory argument. It accepts a string the command to run with space separated arguments
// options - some of the options available are cwd, env, encoding, shell, timeout, etc
// callback - callback function is called when process terminates. Arguments to this function are err (err is when the actual operation fails)
// , stdout, stderr (err in output from the script)
// unlike spawn exec buffers the output and callback is called only once when the process is successfully completed or terminated.

cp.exec("ls -l", exec_options, (err, stdout, stderr) => {
    console.log("#1. exec");
    console.log(stdout);
})

// execSync - it's same as exec, only difference is it blocks the execution of whole application and doesn't have a callback
// only time execSync should be used is the script is stand alone and bunch processes to be run in a row, meaning if it's blocking it's
// not impacting anything else

try{
    const data = cp.execSync("ls -l", exec_options);
    console.log("#2. execSync");
    console.log(data.toString());
}catch(err){
    console.log("err : ", err);
}

// spawn_options
const spawn_options = {
    cwd: null,
    env: null,
    detached: false
};

// spawn - unlike exec which returns a callback spawn returns a child process object
// The ChildProcess instance implements EventEmitterAPI which enables us to register handlers for events on child object directly.
// Some events that can be registered for handling with the ChildProcess are exit, disconnect, error, close and message.
// in the child process object (here child) we can attach stdout, stderr to consume error. 
// here on the 'data' event of the stdout stream log the data that went to stdout
// unlike exec it is unbuffered output, it's gonna be called over and over again, 
// this is not a callback which will be called only once after completion/terminationd of the script,
// this is a callback which will be called every time the data event is triggered for the stdout/stderr stream
// .on("close") lets us know when it's done, the callback has only argument code which is the return code for the process that just ran
// in the options we can pass shell as boolean which by default is false which implies no shell
// shell- If true, runs command inside of a shell. Different shell can be specified as a string.
const child = cp.spawn("ls", ["-l"], spawn_options);

child.stdout.on("data", stdout => {
    console.log("#3. spawn");
    console.log(stdout.toString());
});

child.stderr.on("data", stderr => {
    console.log(stderr.toString());
});

child.on("close", code => {
    console.log("code : ", code);
});

//spawnSync - blocks application until the commmand finishes
const {stdout, stderr} = cp.spawnSync("ls", ["-l"], spawn_options);
console.log("#4. spawn sync");
console.log(stdout.toString());

// fork - is a special case of spawn where the parent and child processes communicate via send().
// fork allows separation of computation intensive task from the main event loop
// Child processes are independent of the parent except the IPC communication channel established between them.
// Each process has its own memory, therefore invoking large number of child processes can affect the performance of the application
// the shell option is not supported by fork

const forkChild = cp.fork(__dirname + '/sub.js');

forkChild.on("message", (m) => {
    console.log("Parent process received : ", m);
})

forkChild.send({hello: "from parent process"});

forkChild.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
})

// execFile - execFile does not spawn a shell by default.
// it is slightly more efficient than exec(), as the specified executable file is spawned directly as a new process
// returns an instance of the child process

const execFile = cp.execFile('node', ['exec.js'], (err, stdout, stderr) => {
    console.log("#5. exec file");
    if (err) {
        throw err
    }
    console.log(stdout.toString());
})