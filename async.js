const https = require('https');

const start = Date.now();

function doREQUEST(){
https.request('https://www.google.com', res => {
    res.on('data', () => {});
    res.on('end', () => {
        console.log(Date.now() - start);
    });
}).end();
};

doREQUEST();
doREQUEST()
doREQUEST()
doREQUEST()
doREQUEST()
doREQUEST()
doREQUEST()
