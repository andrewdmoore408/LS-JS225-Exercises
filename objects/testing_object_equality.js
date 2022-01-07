function objectsEqual(first, second) {
  for (let key in first) {
    if (first[key] !== second[key]) return false;
  }
  
  for (let key in second) {
    if (second[key] !== first[key]) return false;
  }
  
  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
