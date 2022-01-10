/*
Garbage Collection

Read the following code carefully. Will the JavaScript garbage collection mechanism garbage collect the array assigned to the variable array after the function pushIt is run on line 10?

---
No, I don't believe JavaScript will GC the array assigned to local variable array inside the function which global variable makeArrays points to. The returned function (which was assigned to global variable pushIt) has access to this array in its closure, so as long as pushIt isn't reassigned, there's still a reference to the array which local variable array points to and it's not eligible for GC.
*/
function makeArrays() {
  let array = [];

  return () => {
    array.push('');
    return array;
  };
}

const pushIt = makeArrays();
pushIt();
// more code