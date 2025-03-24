// ------------------------------------------------ Exercise 1 ------------------------------------------------ //

console.log("");
console.log("Exercise 1: \n");

function ucFirstLetters(str) {
  let words = str.split(" "); // create an array of each individial word in the string split by  ' '
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1); // I can probably use map here instead
  }
  return words.join(" ");
  // the join combines each element of the array into a string with the parameter injected as a 'seperator'
  // in this case ' ' which was removed by the initial split
}
console.log(ucFirstLetters("Los Angeles")); //Los Angeles
console.log("");

console.log(ucFirstLetters("there once was a man named dave"));
console.log("");

// ------------------------------------------------ Exercise 2 ------------------------------------------------ //

console.log("");
console.log("Exercise 2: \n");

function truncate(str, max) {
  if (str.length > max) {
    return str.slice(0, 25) + "...";
  } else {
    return str;
  }
}

console.log(truncate("This text will be truncated if it is too long", 25));
// This text will be truncat...
console.log("");

function truncateWithConditional(str, max) {
  return str.length > max ? str.slice(0, max) + "..." : str;
}

console.log(
  truncateWithConditional("This text will be truncated if it is too long", 25)
);
console.log("");

// ------------------------------------------------ Exercise 3 ------------------------------------------------ //

console.log("");
console.log("Exercise 3: \n");

const animals = ["Tiger", "Giraffe"];
console.log(animals);
console.log("");

// add 2 new variables at the end
animals.push("Panda", "Pig");
console.log(animals);
console.log("");

//add 2 new variables to the beginning
animals.unshift("Deer", "dog");
console.log(animals);
console.log("");

//sort the variables alphabetically
animals.sort();
console.log(animals);
console.log("");

// replace the value of the middle animal
function replaceMiddleAnimal(newValue) {
  const middleIndex = Math.floor(animals.length / 2);
  // with an even number, the position is rounded up.
  // If the preferance is to round down then use (animals.length-1)
  animals[middleIndex] = newValue; // this function is specific to the animals array
  // adapting it to any general array would require the array to be passed in as a parameter
}

replaceMiddleAnimal("Elephant");
console.log(animals);
console.log("");

// return a new array containing all the animals that begin with provided string
function findMatchingAnimals(beginsWith) {
  let matches = [];
  for (let i = 0; i < animals.length; i++) {
    if (animals[i].toLowerCase().startsWith(beginsWith.toLowerCase())) {
      matches.push(animals[i]);
    }
  }
  return matches;
}

let test1 = findMatchingAnimals("D");

console.log(test1);
console.log("");

function findMatchingAnimalsWithFilter(beginsWith) {
  return animals.filter(
    (animal) => animal.toLowerCase().startsWith(beginsWith.toLowerCase()) // this returns a new array of the matching elements but does not modify the original array
  );
}

let test2 = findMatchingAnimalsWithFilter("D");
console.log(test2);
console.log(animals);

// ------------------------------------------------ Exercise 4 ------------------------------------------------ //

console.log("");
console.log("Exercise 4: \n");

console.log("camelCase(cssProp):");
function camelCase(cssProp) {
  //split the string by "-"
  let words = cssProp.split("-"); // words will be a array of words with the split argument removed
  if (words.length == 0) {
    return words;
  }
  //iterate through the remaining array and capitalize the first letter of every word except the very first
  for (let i = 1; i < words.length; i++) {
    // set i to 1 so it skips the first word
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join("");
}

console.log(camelCase("margin-left")); // marginLeft
console.log(camelCase("background-image")); // backgroundImage
console.log(camelCase("display")); // display
console.log("");

console.log("camelCasewithForEach(cssProp):");
function camelCaseWithForEach(cssProp) {
  let words = cssProp.split("-");
  words.forEach((word, index) => {
    if (index > 0) {
      // skips the first word/element
      words[index] = word.charAt(0).toUpperCase() + word.slice(1);
    }
  });
  return words.join("");
}

console.log(camelCaseWithForEach("margin-left")); // marginLeft
console.log(camelCaseWithForEach("background-image")); // backgroundImage
console.log(camelCaseWithForEach("display")); // display
console.log("");

console.log("camelCasewithForEachConditional(cssProp):");
function camelCaseWithForEachConditional(cssProp) {
  let words = cssProp.split("-");
  words.forEach((word, index) => {
    words[index] =
      index > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word; // word is returned for index = 0 (first word unchanged)clear
  });
  return words.join("");
}

console.log(camelCaseWithForEachConditional("margin-left")); // marginLeft
console.log(camelCaseWithForEachConditional("background-image")); // backgroundImage
console.log(camelCaseWithForEachConditional("display")); // display
console.log("");

console.log("camelCasewithForOf(cssProp):");
function camelCaseWithForOf(cssProp) {
  let words = cssProp.split("-");
  let result = words[0]; // first word unchanged and immeditely added to be returned
  for (const word of words.slice(1)) {
    result += word.charAt(0).toUpperCase() + word.slice(1); // add modified elements implicitely to string to be returned
  }
  return result;
}

console.log(camelCaseWithForOf("margin-left")); // marginLeft
console.log(camelCaseWithForOf("background-image")); // backgroundImage
console.log(camelCaseWithForOf("display")); // display
console.log("");

console.log("camelCasewithForOfConditional(cssProp):");
function camelCaseWithForOfConditional(cssProp) {
  let words = cssProp.split("-");
  let result = words[0];
  for (const word of words.slice(1)) {
    result += word ? word.charAt(0).toUpperCase() + word.slice(1) : ""; //add nothing if there is an empty or non existing element
    // --> this is kind of pointless but I could not think of another way
  }
  return result;
}

console.log(camelCaseWithForOfConditional("margin-left")); // marginLeft
console.log(camelCaseWithForOfConditional("background-image")); // backgroundImage
console.log(camelCaseWithForOfConditional("display")); // display
console.log("");

console.log("camelCaseVariant(cssProp):");
function camelCaseVariant(cssProp) {
  let words = cssProp.split("-");
  words = words.map((word, index) => {
    if (index === 0) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return words.join("");
}

console.log(camelCaseVariant("margin-left")); // marginLeft
console.log(camelCaseVariant("background-image")); // backgroundImage
console.log(camelCaseVariant("display")); // display
console.log("");

// There is more than one way to skin a cat :-D

// ------------------------------------------------ Exercise 5 ------------------------------------------------ //

console.log("");
console.log("Exercise 5: \n");

let twentyCents = 0.2;
let tenCents = 0.1;
console.log(`${twentyCents} + ${tenCents} = ${twentyCents + tenCents}`);

let fixedTwenty = twentyCents.toFixed(2);
let fixedTen = tenCents.toFixed(2);
console.log(fixedTwenty + fixedTen); //why is this not working?
// toFixed returns a String so the result is concatenated instead of being converted into a number
console.log("");

console.log("currencyAddition(float1, float2): ");
function currencyAddition(float1, float2) {
  let fixed1 = Math.floor(float1 * 100); // this will assume 2dp
  let fixed2 = Math.floor(float2 * 100); // is Math.round better or worse for this?

  return (fixed1 + fixed2) / 100;
}

console.log(currencyAddition(0.2, 0.1));
console.log("");

console.log("currencyOperation(float1, float2, operation): ");
function currencyOperation(float1, float2, operation) {
  let fixed1 = Math.floor(float1 * 100); // this will assume 2dp
  let fixed2 = Math.floor(float2 * 100);
  let result;

  switch (operation) {
    case "+":
      result = (fixed1 + fixed2) / 100;
      break;
    case "-":
      result = (fixed1 - fixed2) / 100;
      break;
    case "*":
      result = (fixed1 * fixed2) / 10000;
      break;
    case "/":
      result = fixed1 / fixed2;
      break;
  }

  return result;
}

console.log(currencyOperation(0.2, 0.1, "+"));
console.log(currencyOperation(0.2, 0.1, "-"));
console.log(currencyOperation(0.2, 0.1, "*"));
console.log(currencyOperation(0.2, 0.1, "/"));
console.log("");

console.log(
  "currencyOperationWithDecimals(float1, float2, operation, numDecimals): "
);
function currencyOperationWithDecimals(float1, float2, operation, numDecimals) {
  if (numDecimals < 1 || numDecimals > 10) {
    throw new Error("numDecimals must be between 1 and 10");
  }

  let factor = Math.pow(10, numDecimals);
  let fixed1 = Math.floor(float1 * factor);
  let fixed2 = Math.floor(float2 * factor);
  let result;

  switch (operation) {
    case "+":
      result = (fixed1 + fixed2) / factor;
      break;
    case "-":
      result = (fixed1 - fixed2) / factor;
      break;
    case "*":
      result = (fixed1 * fixed2) / (factor * factor);
      break;
    case "/":
      result = fixed1 / fixed2;
      break;
  }

  return result.toFixed(numDecimals);
}

console.log(currencyOperationWithDecimals(0.2, 0.1, "+", 10));
console.log(currencyOperationWithDecimals(0.2, 0.1, "-", 3));
console.log(currencyOperationWithDecimals(0.2, 0.1, "*", 4));
console.log(currencyOperationWithDecimals(0.2, 0.1, "/", 5));
console.log("");

// ------------------------------------------------ Exercise 6 ------------------------------------------------ //

console.log("");
console.log("Exercise 6: \n");

// function unique(duplicatesArray) {
//   let newSet = new Set(duplicatesArray); // each value is unique in a set so it removed duplicates by default
//   if(newSet == Array.from(newSet)){
//     return duplicatesArray;
//   }

//   let duplicatesRemovedArray = [];
//   for (let unique of newSet) {
//     // set is an iterable so we can use for ...of
//     duplicatesRemovedArray.push(unique);
//   }
//   return duplicatesRemovedArray;
// }
// I am leaving this here to highlight the difference in code efficiency from using some built in functions

function unique(duplicatesArray) {
  let newSet = new Set(duplicatesArray); // each value is unique in a set so it removes duplicates by default
  return Array.from(newSet); // convert the set back to an array
}

const colours = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "red",
  "blue",
  "yellow",
];

const testScores = [55, 84, 97, 63, 55, 32, 84, 91, 55, 43];

console.log(colours);
console.log(testScores);

console.log("unique(duplicatesArray) \n");
console.log(unique(colours)); // [ 'red', 'green', 'blue', 'yellow', 'orange' ]
console.log(unique(testScores)); // [ 55, 84, 97, 63, 32, 91, 43 ]
console.log("");
console.log("Test with array without duplicates: ");
const sports = ["Rugby", "Hockey", "Cricket", "Tennis"];
console.log(unique(sports));

// ------------------------------------------------ Exercise 7 ------------------------------------------------ //

console.log("");
console.log("Exercise 7: \n");

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
  },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { id: 3, title: "1984", author: "George Orwell", year: 1949 },
  { id: 4, title: "Brave New World", author: "Aldous Huxley", year: 1932 },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
  },
];

console.log("getBookTitle(bookId): ");
function getBookTitle(bookId) {
  const book = books.find((book) => book.id == bookId);
  return book ? book.title : null;
}

console.log(getBookTitle(1));
console.log(getBookTitle(5));
console.log(getBookTitle(7));
console.log("");

function getOldBooks() {
  const oldBooks = books.filter((oldBooks) => oldBooks.year < 1950);
  return oldBooks ? oldBooks : null;
}

console.log("getOldBooks(): ");
console.log(getOldBooks());
console.log("");

function addGenre() {
  const updatedBooks = books.map((book) => ({ ...book, Genre: "Classical" }));
  return updatedBooks;
}

console.log("addGenre(): ");
console.log(addGenre());
console.log("");

function getTitles(authorInitial) {
  return books
    .filter((book) => book.author.startsWith(authorInitial))
    .map((book) => book.title);
}

console.log("getTitles(authorInitial): ");
console.log(getTitles("F"));
console.log(getTitles("H"));
console.log(getTitles("G"));
console.log("");

function latestBook() {
  let latest = books[0];
  books.forEach((book) => {
    if (book.year > latest.year) {
      latest = books.find((book) => book.year > latest.year);
    }
  });
  return latest;
}

console.log("latestBook(): ");
console.log(latestBook());

// ------------------------------------------------ Exercise 8 ------------------------------------------------ //

console.log("");
console.log("Exercise 8: \n");

const phoneBookABC = new Map(); //an empty map to begin with
phoneBookABC.set("Annabelle", "0412312343");
phoneBookABC.set("Barry", "0433221117");
phoneBookABC.set("Caroline", "0455221182");

console.log(phoneBookABC);
console.log("");

let phoneBookDEF = new Map(); // I think I'm following the instructions correctly here 8. a)
phoneBookDEF = new Map([
  // 8. b) I'm sure I'd otherwise combine the declare and initialise in the same statement otherwise
  ["Derek", "01256312343"],
  ["Earl", "0438881117"],
  ["Frank", "042393841182"],
]);

console.log("Create phoneBookDEF: ");
console.log(phoneBookDEF);
console.log("");

console.log("Update the phone number for Caroline: ");
phoneBookABC.set("Caroline", "01111111111");
console.log(phoneBookABC);
console.log("");

function printPhoneBook(contacts) {
  contacts.forEach((phone, name) => {
    console.log(`${name}: ${phone}`);
  });
}

console.log("printPhoneBook(contacts: ");
printPhoneBook(phoneBookABC);
console.log("");
printPhoneBook(phoneBookDEF);
console.log("");

console.log("Combine the phoneBooks into a map: ");
const combinedPhoneBook = new Map([...phoneBookABC, ...phoneBookDEF]);
console.log(combinedPhoneBook);

// ------------------------------------------------ Exercise 9 ------------------------------------------------ //

console.log("");
console.log("Exercise 9: \n");

let salaries = {
  Timothy: 35000,
  David: 25000,
  Mary: 55000,
  Christina: 75000,
  James: 43000,
};

function sumSalaries(salaries) {
  let total = 0;
  for (let salary in salaries) {
    // Objects are not iterable so cannot use for..of
    total += salaries[salary];
  }
  return total;
}

//   function sumSalaries(salaries) {
//   let total = 0;
//   for (let salary of Object.values(salaries)) { // Object can be converted to Array to use for..of "Object.values()" only returns the value and not the key
//     total += salary;
//   }
//   return total;
// }

console.log(sumSalaries(salaries));
console.log("");

function topEarner(salaries) {
  let maxSalary = 0;
  let topEarner = "";
  for (let name in salaries) {
    // Objects are not iterable so cannot use for..of
    if (salaries[name] > maxSalary) {
      // can call the value using the key
      maxSalary = salaries[name];
      topEarner = name; //can use the key directly and assign to topEarner
    }
  }
  return topEarner;
}

// function topEarner(salaries) {
//   let maxSalary = 0;
//   let topEarner = "";
//   for (let [name, salary] of Object.entries(salaries)) { // if converting to an array we can use for..of with key and value as arguments with "Object.entries()"
//     if (salary > maxSalary) {
//       maxSalary = salary;
//       topEarner = name;
//     }
//   }
//   return topEarner;
// }

console.log(topEarner(salaries));

// ------------------------------------------------ Exercise 10 ------------------------------------------------ //

console.log("");
console.log("Exercise 10: \n");

const today = new Date();
console.log("Current time is " + today.toLocaleTimeString());
console.log(today.getHours() + " hours have passed so far today");
console.log("");
console.log(
  today.getMinutes() + // get minutes is the minutes from the start of the current hour
    today.getHours() * 60 +
    " minutes have passed so far today \n"
);
console.log(
  today.getSeconds() + // get seconds is from the start of the current minute
    today.getMinutes() * 60 +
    today.getHours() * 3600 +
    " seconds have passed so far today \n"
);

// Calculate and print my age
const birthDate = new Date(Date.UTC(1989, 3, 5, 2, 0, 0)); // I was born in the UK at 2am which is UTC
const now = new Date();

function calculateAge(birthDate, now) {
  let years = now.getUTCFullYear() - birthDate.getUTCFullYear(); // no need to convert to local
  let months = now.getUTCMonth() - birthDate.getUTCMonth();
  let days = now.getUTCDate() - birthDate.getUTCDate();

  if (days < 0) {
    months--;
    days += new Date(now.getUTCFullYear(), now.getUTCMonth(), 0).getUTCDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

const age = calculateAge(birthDate, now);
console.log(
  `I am ${age.years} years, ${age.months} months and ${age.days} days old`
);
console.log("");

function daysInBetween(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const diffInTime = Math.abs(date2 - date1); // this also converts a negatice calculation to a positive
  return Math.round(diffInTime / oneDay);
}

const date1 = new Date("2023-01-01");
const date2 = new Date("2023-12-31");
console.log(`Days in between: ${daysInBetween(date1, date2)}`);
console.log("");
