/*
Anonymizer

Using OLOO create an Account prototype object that anonymizes user objects on init. The created object should not have access to the function that anonymizes a user other than through the init and reanonymize methods. The function that anonymizes creates a 16 character sequence composed of letters and numbers. The following are the properties and methods on the Account object:

    init: The init method sets the email, password, firstName, lastName, and displayName of user. The displayName is a 16 character sequence generated for the user. It's used as the display name of a user.
    reanonymize: This method generates a new 16 character sequence and reassigns it to the displayName property if the password provided is valid. Returns true if successfully re-anonymized. Returns 'Invalid Password' if the password provided is not valid.
    resetPassword: This method asks the user for a new password and reassigns it to the password property. To reset the password, the user must provide the current password. Returns 'Invalid Password' if the password provided is not valid. Returns true if the password is successfully reset.
    firstName: This method returns the first name of the user if the password provided is valid. Returns 'Invalid Password' if the password provided is not valid.
    lastName: This method returns the last name of the user if the password provided is valid. Returns 'Invalid Password' if the password provided is not valid.
    email: This method returns the email name of the user if the password provided is valid. Returns 'Invalid Password' if the password provided is not valid.
    displayName: This property returns the displayName — the 16 character sequence.

Other than the above properties, methods, and properties inherited from Object.prototype, no other method or property should exist on the object returned by the Account prototype object.

Further Exploration

This solution works but it only works for one set of private data. Modify the solution so that it can accommodate creating multiple objects with their own private data.
*/
const Account = (function () {
  function anonymize() {
    const CHARS = 'abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let anonString = '';
    
    for (let index = 0; index < 16; index += 1) {
      let charIndex = Math.floor(Math.random() * CHARS.length);
      anonString += (CHARS[charIndex]);
    }
    
    return anonString;
  }
  
  function validPassword(obj, password) {
    return getAccount(obj).userPassword === password;
  }
    
  function setPassword(obj, newPassword) {
    getAccount(obj).userPassword = newPassword;  
  }
  
  let accountID = 1233;
  
  function getNewAccountID() {
    accountID += 1;
    return accountID;  
  }
  
  function addAccount(accountObj, userEmail, userPassword, userFirstName, userLastName) {
    const newAccount = {
      userEmail,
      userPassword,
      userFirstName,
      userLastName,
      info: accountObj,
    };
    
    accounts[accountObj.accountID] = newAccount;
  }
  
  function getAccount(obj) {
    return accounts[obj.accountID];
  }
  
  function getFirstName(obj) {
    return getAccount(obj).userFirstName;
  }
  
  function getLastName(obj) {
    return getAccount(obj).userLastName;
  }
  
  function getEmail(obj) {
    return getAccount(obj).userEmail;
  }
  
  const accounts = {};
  
  let userEmail, userPassword, userFirstName, userLastName;
  
  return {
    init(email, password, firstName, lastName) {
      this.displayName = anonymize();
      this.accountID = getNewAccountID();
      
      addAccount(this, email, password, firstName, lastName);
      
      return this;
    },
    
    reanonymize(password) {
      if (validPassword(this, password)) {
        this.displayName = anonymize();
        return true;
      } else {
        return 'Invalid Password';
      }
    },    
    
    resetPassword(currentPassword, newPassword) {
      if (validPassword(this, currentPassword)) {
        setPassword(this, newPassword);
        return true;
      } else {
        return 'Invalid Password';
      }
    },
    
    firstName(password) {
      if (validPassword(this, password)) {
        return getFirstName(this);
      } else {
        return 'Invalid Password';
      }
    },
    
    lastName(password) {
      if (validPassword(this, password)) {
        return getLastName(this);
      } else {
        return 'Invalid Password';
      }
    },
    
    email(password) {
      if (validPassword(this, password)) {
        return getEmail(this);
      } else {
        return 'Invalid Password';
      }
    },
  };
})();

let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
// fooBar.init();
// console.log(fooBar);
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
console.log(fooBar.reanonymize('abc'));            // returns true
console.log(displayName === fooBar.displayName);   // logs false

let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.email('abc'));                  // logs 'Invalid Password'
console.log(bazQux.firstName('123456'));              // logs 'Invalid Password'
console.log(bazQux.email('123456'));                  // logs 'Invalid Password'
