console.log("Event loop demo");

// Synchronus - runs immediately on the call stack
console.log("1. synchronous - start");

// Asynchronous - handed to web API, callback goes to queue
setTimeout(() => {
    console.log("4. setTimeout 0ms - runs agter sync code")
}, 0);
setTimeout(() => {
    console.log("5. setTimeout 100ms")
}, 100);

// Promise callbacks go to the MICROTASK queue - higher priority than callback queue
Promise.resolve().then(() => {
    console.log("3. Promise.resolve - microtask queue")
});

// Synchronous - runs immediately
console.log("2. Synchronous - end");