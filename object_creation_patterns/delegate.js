/*
Delegate

Write a delegate function that can be used to delegate the behavior of a method or function to another object's method. delegate takes a minimum of two arguments: (1) the object and (2) name of the method on the object. The remaining arguments, if any, are passed — as arguments — to the objects' method that it delegates to.

Note that this is not the same as using bind. bind returns a new function, whereas delegate maintains the reference.

Input:
  object: obj(the object on which the method we want to invoke is defined)
  string: methodName (the property name of the object obj points to that we want to invoke)
  (optional) args: various types/number

Output:
  A function which leads to the method methodName points to on object obj being invoked, with any additional arguments passed into that method as its own args

Notes:
  Need to return a reference to the function with args applied...? Hrrrrrm
*/
function delegate(obj, methodName, ...args) {
  return function() {
    return obj[methodName](...args);
  };
}

const foo = {
  name: 'test',
  bar(greeting) {
    console.log(`${greeting} ${this.name}`);
  },
};

// console.log(foo.bar);

const baz = {
  qux: delegate(foo, 'bar', 'hello', 'soup'),
};

baz.qux();   // logs 'hello test';

foo.bar = () => { console.log('changed'); };

baz.qux();          // logs 'changed'

foo.bar = function(greeting, food) {
  console.log(`${greeting}, ${this.name}. Want some ${food}?`);
};

baz.qux();

// console.log(Object.entries(baz));