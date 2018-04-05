

const pendingTimers = [];
const pendingOSTaks = [];
const pendingOperations = [];

//New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
    //Check 1: timers - Any pending setTimeout, setInterval or setImmediate. The EL continues running for the next tick; does not exit
    //Check 2: Check for any OS related tasks like I/O operations
    //Check 3: Any pending long running operations like fs.Readfile() -  this is similar to check 2
    return pendingTimers.length || pendingOSTaks.length || pendingOperations.length

}

//entire body executes in one tick 
while(shouldContinue()){
    //if the above function returns false, the execution will return to our terminal otherwise it will just continue running
    //Step 1: Node looks at pending timers and sees if any functions are ready to be called
    //Step 2: Node looks at pendingOSTaks and calls the relevant tasks - ex. if a server is listening on a port or if a fs.Readfile has finished reading a file (I/O)
    //Step 3: Node pauses execution, waits for future events
               // - a new pendingOSTask is completed
               // - a new pendingOperation is completed
               // - a timer is about to be completed
    //Step 4: Node looks at pendingTimers but only cares about setImmediate() and calls if any (check)
    //Step 5: Node handles any close events. ex socket.on('close', () => {})
}


//setImmediate vs setTimeout
//Always setImmediate will be called first over setTimeout when called from inside of a I/O cycle
//Otherwise calls between the 2 are non-deterministic
const fs = require('fs');

fs.readFile('package.json', () => {
    setTimeout(() =>{
        console.log('timeout');
    }, 0);
    
    setImmediate(() => {
        console.log('immediate')
    });
})

