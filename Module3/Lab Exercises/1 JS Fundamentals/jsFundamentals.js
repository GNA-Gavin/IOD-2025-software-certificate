// ------------------------------------------------ Exercise 1 ------------------------------------------------ //

console.log("");
console.log("Exercise 1: \n");

console.log("Expression 1: ");
// "" + 1 + 0
// Will be "10" (string)
console.log("" + 1 + 0); // "10"
console.log(typeof ("" + 1 + 0)); // string
console.log("");

console.log("Expression 2: ");
// "" - 1 + 0
// Will be -1 (number)
console.log("" - 1 + 0); // -1
console.log(typeof ("" - 1 + 0)); // number
console.log("");

console.log("Expression 3: ");
// true + false
// Will be false (boolean)
console.log(true + false); // 1
console.log(typeof (true + false)); // number
console.log("");

console.log("Expression 4: ");
// !true
// Will be false (boolean)
console.log(!true); // false
console.log(typeof !true); // boolean
console.log("");

console.log("Expression 5: ");
// 6 / "3"
// Will be 2 (number)
console.log(6 / "3"); // 2
console.log(typeof (6 / "3")); // number
console.log("");

console.log("Expression 6: ");
// "2" * "3"
// Will be 6 (number)
console.log("2" * "3"); // 6
console.log(typeof ("2" * "3")); // number
console.log("");

console.log("Expression 7: ");
// 4 + 5 + "px"
// Will be "9px" (string)
console.log(4 + 5 + "px"); // "9px"
console.log(typeof (4 + 5 + "px")); // string
console.log("");

console.log("Expression 8: ");
// "$" + 4 + 5
// Will be "$45" (string)
console.log("$" + 4 + 5); // "$45"
console.log(typeof ("$" + 4 + 5)); // string
console.log("");

console.log("Expression 9: ");
// "4" - 2
// Will be 2 (number)
console.log("4" - 2); // 2
console.log(typeof ("4" - 2)); // number
console.log("");

console.log("Expression 10: ");
// "4px" - 2
// Will be NaN (number)
console.log("4px" - 2); // NaN
console.log(typeof ("4px" - 2)); // number
console.log("");

console.log("Expression 11: ");
// " -9 " + 5
// Will be -4 (number)
console.log(" -9 " + 5); // " -9 5"
console.log(typeof (" -9 " + 5)); // string
console.log("");

console.log("Expression 12: ");
// " -9 " - 5
// Will be -14 (number)
console.log(" -9 " - 5); // -14
console.log(typeof (" -9 " - 5)); // number
console.log("");

console.log("Expression 13: ");
// null + 1
// Will be 1 (number)
console.log(null + 1); // 1
console.log(typeof (null + 1)); // number
console.log("");

console.log("Expression 14: ");
// undefined + 1
// Will be 1 (number)
console.log(undefined + 1); // NaN
console.log(typeof (undefined + 1)); // number
console.log("");

console.log("Expression 15: ");
// undefined == null
// Will be true
console.log(undefined == null); // true
console.log("");

console.log("Expression 16: ");
// undefined == null
// Will be false
console.log(undefined === null); // false
console.log("");

console.log("Expression 17: ");
// " \t \n" - 2
// Will be -2 (number)
console.log(" \t \n" - 2); // -2
console.log(typeof (" \t \n" - 2)); // number
console.log("");

// ------------------------------------------------ Exercise 2 ------------------------------------------------ //

console.log("Exercise 2: \n");

let three = "3";
let four = "4";
let thirty = "30";
//what is the value of the following expressions?

console.log("Expression 1: ");
let addition = three + four; // "34" (string)
console.log(addition); // "34"
console.log(typeof addition); // string
console.log("");

console.log("Expression 2: ");
let multiplication = three * four; // 12 (number)
console.log(multiplication); // 12
console.log(typeof multiplication); // number
console.log("");

console.log("Expression 3: ");
let division = three / four; // 0.75 (number)
console.log(division); // 0.75
console.log(typeof division); // number
console.log("");

console.log("Expression 4: ");
let subtraction = three - four; // -1 (number)
console.log(subtraction); // -1
console.log(typeof subtraction); // number
console.log("");

console.log("Expression 5: ");
let lessThan1 = three < four;
console.log(lessThan1); // true
console.log("");

console.log("Expression 6: ");
let lessThan2 = thirty < four;
console.log(lessThan1); // true because the strings are being compared, not their numeric values
console.log("");

// we can cast to number using Number() or parseInt()
// we don't need to use additional variables - this is just for demonstation purposes
// Ideally we'd cast at the initialisation itself so all following use cases are correct
let threeNumber = Number(three);
let fourNumber = Number(four);
let thirtyNumber = Number(thirty);

console.log("Expression 7: ");
let newLessThan1 = threeNumber < fourNumber;
console.log(newLessThan1); // true
console.log("");

console.log("Expression 8: ");
let newLessThan2 = thirtyNumber < fourNumber;
console.log(newLessThan2); // true because the strings are being compared, not their numeric values
console.log("");
// commment from Mirza on how to fix this:
let lessThan2_fixed = Number(thirty) < Number(four); //fixed - converted strings to numbers
let lessThan2_fixed2 = parseInt(thirty) < parseInt(four); //fixed - converted strings to ints
console.log(lessThan2_fixed);
console.log("");
console.log(lessThan2_fixed2)




// ------------------------------------------------ Exercise 3 ------------------------------------------------ //

console.log("Exercise 3: \n");

if (0) console.log("#1 zero is true"); // false - won't print

if ("0") console.log("#2 zero is true"); // true - will print. Value is a string, it won't be converted to a number

if (null) console.log("null is true"); // true = will print

if (-1) console.log("negative is true"); // true - will print

if (1) console.log("positive is true"); // true - will print

console.log("");

// ------------------------------------------------ Exercise 4 ------------------------------------------------ //

console.log("Exercise 4: \n");

let a = 2,
  b = 3;

let result = `${a} + ${b} is `;

if (a + b < 10) {
  result += "less than 10";
} else {
  result += "greater than 10";
}
console.log(result + "\n");

let c = 5,
  d = 6;

let newResult = `${c} + ${d} is `;

c + d < 10 ? (newResult += "less than 10") : (newResult += "greater than 10");

console.log(newResult + "\n");

// += retains the intial value and adds the right side to it. In this case, the strings are concatinated
// numbers would result in an addition

// ------------------------------------------------ Exercise 5 ------------------------------------------------ //

console.log("Exercise 5: \n");

function getGreeting(name) {
  return "Hello " + name + "!";
}
console.log(getGreeting("Gavin"));
console.log("");

// functional expression syntax
const newGetGreeting = function (name) {
  return "Hello " + name + "!";
};
console.log(newGetGreeting("Mirza"));
console.log("");

// arrow function syntax
const arrowGetGreeting = (name) => {
  return "Hello " + name + "!";
};
console.log(newGetGreeting("Graham"));
console.log("");

// ------------------------------------------------ Exercise 6 ------------------------------------------------ //

console.log("Exercise 6: \n");

const westley = {
  name: "Westley",
  numFingers: 5,
};

const rugen = {
  name: "Count Rugen",
  numFingers: 6,
};

const inigo = {
  firstName: "Inigo",
  lastName: "Montoya",
  greeting(person) {
    let greeting = `Hello ${person.name}, my name is ${this.firstName} ${this.lastName}. `;
    console.log(greeting + this.getCatchPhrase(person));
  },
  getCatchPhrase: (person) =>
    person.numFingers == 6
      ? "You killed my father. Prepare to die."
      : "Nice to meet you.",
};

inigo.greeting(westley);
console.log("");

inigo.greeting(rugen);
console.log("");

// ------------------------------------------------ Exercise 7 ------------------------------------------------ //

console.log("Exercise 7: \n");

const basketballGame = {
  score: 0,
  fouls: 0,
  freeThrow() {
    this.score++;
    return this;
  },
  basket() {
    this.score += 2;
    return this;
  },
  threePointer() {
    this.score += 3;
    return this;
  },
  halfTime() {
    console.log("Halftime score is " + this.score + ". Fouls: " + this.fouls);
    return this;
  },
  fullTime() {
    console.log("Final score is " + this.score + ". Fouls: " + this.fouls);
    return this;
  },
  foul() {
    this.fouls++;
    return this;
  },
};
//modify each of the above object methods to enable function chaining as below:
basketballGame
  .basket()
  .freeThrow()
  .freeThrow()
  .basket()
  .threePointer()
  .halfTime()
  .foul()
  .threePointer()
  .freeThrow()
  .basket()
  .foul()
  .foul()
  .basket()
  .threePointer()
  .fullTime();
console.log("");

// ------------------------------------------------ Exercise 8 ------------------------------------------------ //

console.log("Exercise 8: \n");

const sydney = {
  name: "Sydney",
  population: 5_121_000,
  state: "NSW",
  founded: "26 January 1788",
  timezone: "Australia/Sydney",
};

const printCity = (city) => {
  for (let key in city) {
    console.log(`${key}: ${city[key]}`);
  }
};

printCity(sydney);
console.log("");

const auckland = {
  name: "Auckland",
  population: 1_716_000,
  state: "AUK",
  founded: "18 September 1840",
  timezone: "New Zealand Time",
};

printCity(auckland);
console.log("");

// ------------------------------------------------ Exercise 9 ------------------------------------------------ //

console.log("Exercise 9: \n");

let teamSports = ["Hockey", "Cricket", "Volleyball"];
let dog1 = "Bingo";
let cat1 = { name: "Fluffy", breed: "Siberian" };

console.log("Teams Sports is: " + teamSports + "\n");

let moreSports = teamSports;
console.log("More Sports is: " + moreSports + "\n");
console.log("Teams Sports is: " + teamSports + "\n");

moreSports.push("Rugby", "Softball");
moreSports.unshift("Basketball", "Sailing");
console.log("More Sports is: " + moreSports + "\n");
console.log("Teams Sports is: " + teamSports + "\n");

console.log("dog1 is: " + dog1 + "\n");
let dog2 = dog1;
dog2 = "Bluey";
console.log("dog2 is: " + dog2 + "\n");
console.log("dog1 is: " + dog1 + "\n");

console.log(cat1);
console.log("");
let cat2 = cat1;
console.log(cat2);
console.log("");
console.log(cat1);
console.log("");

cat2.name = "Steve";
console.log(cat2);
console.log("");
console.log(cat1);
console.log("");

// print original teamSports, dog1 and cat1 variables
console.log("Original Variables: " + "\n");
console.log("Teams Sports is: " + teamSports + "\n");
console.log("dog1 is: " + dog1 + "\n");
console.log(cat1);
console.log("");
// Team sports and cat1 have changed since they are copied by reference by default. dog1 is unchanged since primitives are passed by value

let moreMoreSports = [...teamSports];
let cat3 = { ...cat1 };

console.log("moreMoreSports is: " + moreMoreSports + "\n");
console.log("cat3 is: ", cat3);
console.log("");

// Modify moreMoreSports and cat3 to demonstrate they are independent copies
moreMoreSports.push("Tennis");
cat3.name = "Whiskers";

console.log("Modified moreMoreSports is: " + moreMoreSports + "\n");
console.log("Modified cat3 is: ", cat3);
console.log("");

// Print original teamSports and cat1 to show they are unchanged
console.log("Original teamSports is: " + teamSports + "\n");
console.log("Original cat1 is: ", cat1);
console.log("");

// that was shallow clone but we can also use deep clone if there were non-primitives included in the object
// npm install lodash
const _ = require("lodash");
// Create new variables moreMoreSports and cat3 that are deep copies
let evenMoreSports = _.cloneDeep(teamSports);
let cat4 = _.cloneDeep(cat1);

console.log("evenMoreSports is: " + evenMoreSports + "\n");
console.log("cat3 is: ", cat4);
console.log("");

// Modify moreMoreSports and cat3 to demonstrate they are independent copies
evenMoreSports.push("Table Tennis");
cat4.name = "Lucy";

console.log("Modified evenMoreSports is: " + evenMoreSports + "\n");
console.log("Modified cat4 is: ", cat4);
console.log("");

// Print original teamSports and cat1 to show they are unchanged
console.log("Original teamSports is: " + teamSports + "\n");
console.log("Original cat1 is: ", cat1);
console.log("");

// ------------------------------------------------ Exercise 10 ------------------------------------------------ //

console.log("Exercise 10: \n");

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.human = true;
  this.canDrive = () => {
    return this.age > 17 ? true : false;
  }
}

let gavin = new Person("Gavin", 35);
console.log(gavin);
console.log("");

let steve = new Person("Steve", 16);
console.log(steve);
console.log("");

class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.human = true;
    this.canDrive = () => {
        return this.age > 17 ? true : false;
    }
    }
  }

let john = new PersonClass("John", 28);
console.log(john);
console.log("");

// can they drive?
console.log(steve.canDrive() ? steve.name + " can drive!" : steve.name + " cannot drive");
console.log("");
console.log(gavin.canDrive() ? gavin.name + " can drive!" : gavin.name + " cannot drive");
console.log("");
console.log(john.canDrive() ? john.name + " can drive!" : john.name + " cannot drive");
console.log("");




