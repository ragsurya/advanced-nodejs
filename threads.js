process.env.UV_THREADPOOL_SIZE = 2;

const crypto = require('crypto');

const start = Date.now();
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () =>{
    console.log('1 Start:', start);
    console.log('1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () =>{
    console.log('2 Start:', start);
    console.log('2:', Date.now() - start);
});


//this is entirely outside of Event loop. This happens in thread pool.
//In addition to the dedicated single thread for Event loop, 4 more threads are allocated by libuv
//that can be used for computational intensive tasks such as pbkdf2
//The node standard library makes use of them