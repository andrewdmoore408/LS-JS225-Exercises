/*
  The problem with the code was that this wasn't being used to access the object properties (morning, afternoon, or evening). Without this providing that context, morning/afternoon/evening aren't defined and a ReferenceError is raised.
  
  FURTHER EXPLORATION: name can work without the use of this because it's passed in to the object factory function as an argument. This demonstrates the concept of closure.
  
*/

function createGreeter(name) {
  return {
    name: name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }

      console.log(msg);
    },
  };
}

const helloVictor = createGreeter('Victor');
helloVictor.greet('morning');
