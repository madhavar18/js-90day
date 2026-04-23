# JavaScript-90day

90-day JavaScript Learning journey - MERN track.

## Day 6 - event loop, call stack, callbacks, promises, async/await

### What I Learned

- call stack: LIFO stack, only the top of the stack is executing at any moment.
- event loop: it's job is the watch the call stack - when the stack is empty, it picks the next call back from the queue and pushes it on to the stack.
- why event loop? : because some operations might block others since javascript is a single thread language. Inorder to consolidate those time taking processes, the javascript engine hands the operations to Web API's which run outside call stack, on seperate threads managed by the runtime. 
- callbacks: A callback is just a function you pass to another function, to be called when something finishes.
- Promises: A promise represents a value that will be available in the future. 
- async/await: They are just syntactic sugar over promises. make asynchronous code look like synchronous, making them easy to read.


## Day 7 - Arrow functions, Destructuring, Spread and Rest, Map, Filter and Reduce

### What I Learned

- Why arrow functions?: before arrow functions, developers faced problems with `this` in functions. Because regular functions define their own `this` based on how the functons is called. Developers had 2 ugly workarounds. they worked, but they were ugly.  
- What arrow functions solve?: Arrow functions dont define their own `this`. They capture it from the surrounding lexical scope. 
- Destructuring: The art of extracting individual elements from objects and arrays.
- Spread operator: used for extracting elements, cloning objects and arrays etc.,
- Map: Transform every element - same length output.
- Filter: Keep elements matching a condition - shorter output.
- Reduce: Fold and array/object into a single value.