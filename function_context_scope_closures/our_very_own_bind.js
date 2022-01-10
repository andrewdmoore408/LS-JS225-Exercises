/*
Our very own bind()

Function.prototype.bind is a method on all function objects that allows us to hard-bind a function to a particular object. The way this works is that you pass a context object to the bind method and it returns a new function that is essentially the same function but hard-bound to the context object supplied.

Create a function myBind, that accepts two arguments: 1) The function to bind, 2) The context object, and returns a new function that's hard-bound to the passed in context object.
*/
function myBind(func, context) {
  return function(...args) {
    return func.apply(context, args);
  };
}

const logMessage = function(punctuation) {
  console.log(this.message + punctuation);
};

logMessage();

const messageObj = {
  message: 'Sup nurdz?',
}

const otherObj = {
  message: 'Not this one!',
};

logMessage.call(messageObj, '!');

const objLogger = myBind(logMessage, messageObj);
objLogger('&');

objLogger.call(otherObj, '&&&'); // This doesn't work--the function objLogger points to has been hard-bound to the explicit execution context that was passed into myBind as its second argument. However, any arguments passed in will still go through and successfully be used by the hard-bound function.