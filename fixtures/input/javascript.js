// no-var
var log = console.log

// Define a class using ES6 class syntax
class Person {
  constructor(name, age) {
    this.name = name;
      this.age = age;
  }

// Define a method within the class
sayHello() {
  log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
}
}


// consistent-list-newline
const people = [
  new Person('John', 30),
  new Person('Jane', 28)
]

// perfer for of
people.forEach(person => {
  person.sayHello();
});

// Use a template literal to create a multiline string
const _multilineString = `
  This is a multiline string
  that spans multiple lines.
`;

try {
  JSON.parse('invalid JSON');
  // catch-error-name
}
catch (e) {
  console.error('Error parsing JSON:', e.message);
}


let a, b, c,   d,   foo

if (a 
  || b 
      || c || d
        || (d && b)
        ) {
          foo()
        }