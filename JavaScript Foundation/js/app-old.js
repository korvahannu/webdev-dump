'use strict';

console.log("This is a seperate JS file.");

const person = {
    firstName: 'Hannu',
    lastName: 'Korvala',
    age: 28,
    isAlive: true,
    address: {
        city: 'Oulu',
        postalCode: '90570',
        street: 'Kalervontie 1 B 24'
    },
    fullName: function() {
        return this.firstName + ' ' + this.lastName;
    }
};

const greetUser = (p) => {
    console.log(p.fullName());
};

greetUser(person);

const { firstName, age, address: { city }, isAlive: isThisPersonAlive } = person;

console.log(isThisPersonAlive)

for (const p in person) {
    console.log(p)
}

delete person.fullName; // Delete property

// console.log(person.fullName)

const personAsJson = JSON.stringify(person);
console.log(personAsJson)
const personParsed = JSON.parse(personAsJson);
console.log(personParsed)

class Person {
    firstName; // optionally explicit
    // lastName; this still works
    #socialSecurityNumber; // private variable
    #age;

    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.#age = age;
    }

    getFullName = () => `${this.firstName} ${this.lastName}`;

    toString() {
        return firstName + " " + this.lastName + " " + this.#age;
    }

    // Getter and setter
    get ssn() {
        return `***-**-${this.#socialSecurityNumber.substring(this.#socialSecurityNumber.length -4)}`;
    }
    set ssn(social) {
        this.#socialSecurityNumber = social;
    }
    static greet() {
        console.log("Hello from the person class")
    }
}

class Cop extends Person {
    yellStop() {
        console.log(this.firstName + " yells stop");
    }
}

const person1 = new Person('Hannu', 'Korvala', 28);
Person.greet();

console.log(person1.toString());
person1.ssn = '123-45-6789';
const person2 = new Cop('Hannu', 'Korvala', 28);
console.log(person1.ssn);

person2.yellStop();


(function() {
    console.log("Hello from an IIFE");
})();

(function(app) {
    app.firstName = 'Jack Richardson',
    app.yolo = function() {
        console.log("Yolo")
    }
})(window.app = window.app || {});

const myCode = '113355';

// Put stuff under namespace
(function(iifeExample, specialCode) {
    iifeExample.specialCode = specialCode;
    let privateVariable = "You can only get me inside the IIFE";
    iifeExample.printAmazing = function(text) {
        console.log(text)
    }
    iifeExample.printCode = function() {
        console.log(privateVariable);
        console.log(specialCode)
    }
    iifeExample.Person = class {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
    }
})(window.iifeExample = window.iifeExample || {}, myCode)

app.yolo();
console.log(app.firstName)
iifeExample.printAmazing("Hello from iifeExample");

const pa = new iifeExample.Person('Hannu', 'Korcala');

// Extend previous IIFE
(function(app) {
    app.sayGoodbye = function() {
        console.log("Goodbye my friend")
    }
})(window.app = window.app || {})

app.sayGoodbye();
console.log(window)

iifeExample.printCode();
// console.log(iifeExample.privateVariable); // undefined

