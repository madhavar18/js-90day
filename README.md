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


## Day 11 - React and the Virtual DOM

### What I Learned

- React was built by Facebook in 2013, inorder to scale with their huge amount UI renders every second.
- WHY React?: before react existed, devs manipulated the DOM directly using the javascript.  Every time you change something - even as small as a counter - the browser has to reload the whole page.  not just reload, it does the following sequence: 
  1. Find the element in the DOM tree
  2. update it
  3. Recalculate the layout - Reflow
  4. Repaint - redraw the affected pixels.
- Reflow & Repaint were very expensive and doing them continously was a hectic computing task.
- The Virtual DOM: It is the React's solution.  It is not magic.  It is just a plain javascript object, that describes what the UI should look like.
- React Update Cycle: 
  1. State changes
  2. React creates a new Virtual DOM tree
  3. React DIFFS the new tree aganist the previous one (the "reconciliation" algorithm)
  4. React makes only the minimal real DOM changes needed.
- React batches all your state changes, figures out the minimum set of real DOM operations needed, and applies them in one go.  Instead of 50 individual DOM mutations triggering 50 reflows, React does 1 surgical update triggering 1 Reflow.
- Declarative UI always beats Imperative UI: you just need to describe what the UI should look like for a given state. React figures out the transitions.
- JSX: The syntactic sugar that Babel compiles to plain javascript function calls.