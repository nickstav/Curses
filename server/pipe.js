async function sendDataToPythonScript(data, filePath) {
    const { spawn } = require("child_process");

    console.debug('Sending data package to Python script ...');

    // create a promise that will return the required data once the process has finished running
	await new Promise((resolve, reject) => {

        // spawn new child process to call the python script using an absolute path
        const python = spawn('python3', [filePath, data]);
        
		// send data to the python script
        //python.stdin.write(data);

        python.stdout.on('data', (data)=>{
            getResponse(data)
        });
        
		// the 'close' event is emitted when the stdio streams of a child process have been closed. 
        python.on('close', (code)=>{
            confirmClosed(code, resolve, reject)
        });

        python.stdin.end();
        
		// catch errors
		python.stderr.on('data', handleError);
    });
}

//Function that runs when the python process is eventually closed
function confirmClosed(code, resolve, reject) {
    if (code === 0) {
        console.debug(`Child process closed with code ${code}`);
        resolve();
    } else {
        console.debug(`Error: Process could not be completed (${code})`);
        reject();
    }
}

function getResponse(data) {
    //collect all the output from python as a string
    let pythonOutputString = data.toString();
    // return the string to the variable declared in parent function
    console.log(pythonOutputString);
}

//Function that runs when the python process throws an error
function handleError(data) {
    console.log(data);
}


module.exports = { sendDataToPythonScript }