/*
The Franchise

The method franchise.allMovies is supposed to return the following array:
  [
    'How to Train Your Dragon 1',
    'How to Train Your Dragon 2',
    'How to Train Your Dragon 3'
  ]

Explain why this method will not return the desired object? Try fixing this problem by taking advantage of JavaScript lexical scoping rules.

---

This method will not return the desired object because of context loss. When passing a function as an argument, context loss occurs unless the argument function is an arrow function. In this case, the function being passed as an argument is not an arrow function and no explicit execution context is being passed, so this references the global object (or undefined if running in strict mode). Rather than the desired array, ['undefined 1', 'undefined 2', 'undefined 3'] will be returned.

I modified the callback function being passed as an argument so that it's now an arrow function. This will allow the surrounding execution context to propagate through so that this references the object which global variable franchise points to.
*/
const franchise = {
  name: 'How to Train Your Dragon',

  allMovies() {
    return [1, 2, 3].map(number => `${this.name} ${number}`);
  },
};

console.log(franchise.allMovies());