/*
What is This

Read the following code carefully. What do you think is logged on line 7. Try to answer the question before you run the code.

---

I believe this will log 'Rick Sanchez'. Inside an object, this typically refers to the surrounding object (although this could be different here since this is being used in a property value expression rather than a method).

If not 'Rick Sanchez', I believe that would mean this was referencing the implicit context, which means that NaN would be logged (unless the global object had firstName and lastName properties defined on it and we're not running in strict mode) since undefined + undefined == NaN.

NOTE: It turns out it is different since we're not in the context of a method/function. When the object literal is defined, this doesn't have any explicit context and so is referencing the global object (or undefined if strict mode is active). So NaN is logged with the code below.

NB: Anytime outside a function (which could be a method), this refers to the global object. It is only when a function is invoked that this may be assigned to something else.
*/
const person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: () =>
    this.firstName + this.lastName,

  introduce() {
    console.log(`Hi, I'm ${this.firstName}`);
  },
};

console.log(person.fullName());
person.introduce();