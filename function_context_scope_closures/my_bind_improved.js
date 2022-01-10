/*
myBind() Improved

Our earlier implementation of the Function.prototype.bind was simplistic. Function.prototype.bind has another trick up its sleeve besides hard-binding functions to context objects. It's called partial function application. Read this assignment and the MDN documentation to learn more about partial function application.

Alter the myBind function written in the previous exercise to support partial function application.
*/
function myBind(func, context, ...boundArgs) {
  console.log(`boundArgs: ${boundArgs}`);
  return function (...args) {
    return func.apply(context, boundArgs.concat(args));
  };
}

function logIntroAndMessage(greeting, punctuation, message) {
  console.log(`${greeting}, I'm ${this.firstName} ${this.lastName}${punctuation} ${message}${punctuation}`);
}

const andrew = {
  firstName: 'Andrew',
  lastName: 'Moore',
};

const logHelloAndMessage = myBind(logIntroAndMessage, andrew, 'Hello');
logHelloAndMessage('.', 'I\'m pleased to meet you');

const logSupAndMessage = myBind(logIntroAndMessage, andrew, 'Sup', '?');
logSupAndMessage('What are you dweebs doing, coding?!')