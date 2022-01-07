/*
  The problem with this code was that the object property price was being reassigned inside the method definition for discount. Thus, every time the method discout was invoked, the price property was being changed.
  
  Removing the price property reassignment fixes this bug.
*/
const item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount(percent) {
    const discount = this.price * percent / 100;

    return this.price - discount;
  },
};

console.log(item.discount(20));   // should return 40
// 40
console.log(item.discount(50));   // should return 25
// 20
console.log(item.discount(25));   // should return 37.5
// 15
