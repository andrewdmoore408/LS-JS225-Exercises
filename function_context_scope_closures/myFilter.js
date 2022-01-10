/*
myFilter()

In this exercise we'll update the implementation of myFilter by adding the functionality of accepting an optional thisArg just like the original Array.prototype.filter.

Here's our original implementation. We also show an example of how we want to call our modified function: the 3rd argument, filter, supplies the desired context (thisArg).

Modify the original implementation such that the expected result is returned. Don't use the thisArg argument of Array.prototype.forEach.

---
I added a third argument for a context object and set if an if condition so that Function.prototype.call is used with the context if given; otherwise, the function proceeds as it had before.

I chose not to always use the context argument because it could potentially set the context to undefined when the invoker meant to use an implied context (by passing in an arrow function inside a method, for example), but perhaps this isn't a valid concern or wouldn't be possible for some reason I'm missing.
*/
function myFilter(array, func, context) {
  const result = [];

  if (context) {
    array.forEach(value => {
      if (func.call(context, value)) result.push(value);
    });
  } else {
    array.forEach(value => {
      if (func(value)) {
        result.push(value);
      }
    });
  }

  return result;
}

const filter = {
  allowedValues: [5, 6, 9],
};

console.log(myFilter([2, 1, 3, 4, 5, 6, 12], function (val) {
  return this.allowedValues.includes(val);
}, filter)); // returns [5, 6]

console.log(myFilter(['xylophone', 'andrew', 'mom', 'apple', 'oven',  'dad'], function(word) {
  return /[aeiou]/i.test(word[0]);
})); // ['andrew', 'apple', 'oven']