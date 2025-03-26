// ------------------------------------------------ Exercise 1 ------------------------------------------------ //

console.log("");
console.log("Exercise 1: \n");

function makeCounter() {
  let currentCount = 0;
  return function () {
    currentCount++;
    console.log(currentCount);
    return currentCount;
  };
}
let counter1 = makeCounter();
counter1(); // 1
counter1(); // 2

let counter2 = makeCounter();
counter2();
counter2();
counter1();
counter1();
counter1();
counter2();

function makeCounterwithStartFrom(startFrom) {
  let currentCount = startFrom;
  return function () {
    currentCount++;
    console.log(currentCount);
    return currentCount;
  };
}

let counter3 = makeCounterwithStartFrom(3);
counter3();
counter3();

function makeCounterwithIncrement(startFrom, increment) {
  let currentCount = startFrom;
  let i = increment;
  return function () {
    currentCount += i;
    console.log(currentCount);
    return currentCount;
  };
}

let counter4 = makeCounterwithIncrement(5, 10);
counter4();
counter4();

// ------------------------------------------------ Exercise 2 ------------------------------------------------ //

console.log("");
console.log("Exercise 2: \n");

function delayMsg(msg) {
  console.log(`This message will be printed after a delay: ${msg}`);
}
setTimeout(delayMsg, 100, "#1: Delayed by 100ms \n"); // fourth
setTimeout(delayMsg, 20, "#2: Delayed by 20ms"); // third
setTimeout(delayMsg, 0, "#3: Delayed by 0ms"); // seconf
delayMsg("#4: Not delayed at all"); // first

const delayMsgArrow = (msg) => {
  console.log(`This message will be printed after a delay: ${msg}`);
};
setTimeout(delayMsgArrow, 200, "#1: Delayed by 200ms");
setTimeout(delayMsgArrow, 120, "#2: Delayed by 120ms");
setTimeout(delayMsgArrow, 115, "#3: Delayed by 115ms");

let timeoutID = setTimeout(delayMsg, 11000, "#5: Delayed by 11000ms");
clearTimeout(timeoutID);

// // ------------------------------------------------ Exercise 3 ------------------------------------------------ //

console.log("");

function debounce(func) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, 1000); // If setTimeout is not assigned to a variable, the clearTimeout function won't be able to clear the previous timeout.
    // This means that the func will be called multiple times after the specified delay, instead of being debounced.
    // it needs to be outside of the function so it is 'cached'
  };
}

function printMe() {
  console.log("printing debounced message");
}

printMe = debounce(printMe);

//fire off 3 calls to printMe within 300ms - only the LAST one should print, after
//1000ms of no calls
setTimeout(printMe, 100);
setTimeout(printMe, 200);
setTimeout(printMe, 300);

function debounceMs(func, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, ms);
  };
}

function printMe2() {
    console.log("printing debounced message 2");
  }

printMe2 = debounceMs(printMe2,5000);

setTimeout(printMe2, 100);
setTimeout(printMe2, 200);
setTimeout(printMe2, 300);

function debounceWithArgs(func, ms) {
    let timeout;
    return function debounceReturn () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), ms); // the apply is needed to bind the context and pass in arguments for the function
    };
}

function printMeWithArgs(msg) {
    console.log(`${msg}`);
}

printMeWithArgs = debounceWithArgs(printMeWithArgs, 6000);

setTimeout(() => printMeWithArgs("Hello 1"), 100); // cannot use bind since a the decorator function returns an unnamed function
setTimeout(() => printMeWithArgs("Hello 2"), 200); // need to wrap in a new function
setTimeout(() => printMeWithArgs("Hello 3"), 300); // wait we can return a named function? let's try it!

function debounceWithArgsBind(func, ms) {
    let timeout;
    function debounceReturn () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), ms);
    }
    return debounceReturn;
}

function printMeWithArgsBind(msg) {
    console.log(`${msg}`);
}

printMeWithArgsBind = debounceWithArgsBind(printMeWithArgsBind, 6000); // could not get a bind to work here

setTimeout(printMeWithArgsBind.bind(debounceWithArgsBind, "Hello 4"), 400);
setTimeout(printMeWithArgsBind.bind(debounceWithArgsBind, "Hello 5"), 500);
setTimeout(printMeWithArgsBind.bind(debounceWithArgsBind, "Hello 6"), 600);

// ------------------------------------------------ Exercise 4 ------------------------------------------------ //

console.log("");

function printFibonacci() {
  let fib = 1;
  let last = 0;
  let counter = 1;
  let intervalTimer = setInterval(() => {
    let next = fib + last;
    console.log(next);
    last = fib;
    fib = next;
    if (counter >= 10) {
      clearInterval(intervalTimer);
    }
    counter++;
  }, 1000);
}

printFibonacci();

function printFibonacciTimeouts() {
  let fib = 1;
  let last = 0;
  let counter = 1;
  setTimeout(function repeat() {
    let next = fib + last;
    console.log(next);
    last = fib;
    fib = next;
    counter++;
    if(counter < 10) setTimeout(repeat, 1000);
  });
}

printFibonacciTimeouts();

function printFibonacciLimit(limit) {
  let fib = 1;
  let last = 0;
  let counter = 1;
  let intervalTimer = setInterval(() => {
    let next = fib + last;
    console.log(next);
    last = fib;
    fib = next;
    if (counter >= limit) {
      clearInterval(intervalTimer);
    }
    counter++;
  }, 1000);
}

printFibonacciLimit(10);

function printFibonacciTimeoutsLimit(limit) {
    let fib = 1;
    let last = 0;
    let counter = 0;
    setTimeout(function repeat() {
      let next = fib + last;
      console.log(next);
      last = fib;
      fib = next;
      counter++;
      if(counter < limit) setTimeout(repeat, 1000);
    });
  }

  printFibonacciTimeoutsLimit(6);

// ------------------------------------------------ Exercise 5 ------------------------------------------------ //

console.log("");

let car = {
  make: "Porsche",
  model: "911",
  year: 1964,
  description() {
    console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
  },
};
car.description(); //works
setTimeout(car.description, 200); //fails
// fails since the function is passed by reference instead of beingc called directly --> context (this) is lost

// 5a
setTimeout(() => {
  car.description();
}, 200); // wrapping functio inside a function to call directly

// 5b
let newCar = { ...car, year: 2023 };
setTimeout(() => {
  newCar.description();
}, 300); // new value used since newCar is a different instance of car object

// 5c
const boundDescriptionCar = car.description.bind(car);
setTimeout(boundDescriptionCar, 400);
// or
setTimeout(newCar.description.bind(newCar), 500);

// 5d
let anotherCar = { ...car, make: "Ferrari" };
setTimeout(() => {
  anotherCar.description();
}, 600);

setTimeout(boundDescriptionCar, 700); // nound value still associated with car (not anotherCar or newCar)

// ------------------------------------------------ Exercise 6 ------------------------------------------------ //

console.log("");

function multiply(a, b) {
  console.log(a * b);
}

// 6a
Function.prototype.delay = function(ms) {
    let func = this;
    return function(a, b) {
        setTimeout(() => func.call(this, a, b), ms); // apply not working: "TypeError: CreateListFromArrayLike called on non-object"
    };
};

multiply.delay(500)(5, 5); // prints 25 after 500 milliseconds

// 6b
Function.prototype.delayApply = function(ms) {
    let func = this;
    return function() {
        setTimeout(() => func.apply(this, arguments), ms); // call does not work: returns NaN
    };
};

multiply.delayApply(700)(6, 5); // prints 30 after 700 milliseconds

// 6c
Function.prototype.delayApplyMultiply = function(ms) {
    let func = this;
    return function() {
        setTimeout(() => func.apply(this, arguments), ms);
    };
};

function multiply4(a, b, c, d) {
    console.log(a * b * c * d);
}

multiply4.delayApplyMultiply(700)(2, 3, 4, 5); // prints 120 after 700 milliseconds

// ------------------------------------------------ Exercise 7 ------------------------------------------------ //

console.log("");

class DigitalClock {
  constructor(prefix) {
    this.prefix = prefix;
  }
  display() {
    let date = new Date();
    //create 3 variables in one go using array destructuring
    let [hours, mins, secs] = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];
    if (hours < 10) hours = "0" + hours;
    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;
    console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
  }
  stop() {
    clearInterval(this.timer);
  }
  start() {
    this.display();
    this.timer = setInterval(() => this.display(), 1000);
  }
}
const myClock = new DigitalClock("my clock:");
myClock.start();
setTimeout(() => myClock.stop(), 2000);

// 7a
class PrecisionClock extends DigitalClock {
  constructor(prefix, precision = 1000) {
    super(prefix);
    this.precision = precision;
  }
  start() {
    this.display();
    this.timer = setInterval(() => this.display(), this.precision);
  }
}

const preciseClock = new PrecisionClock("precise clock:", 500);
preciseClock.start();
setTimeout(() => preciseClock.stop(), 3000);

// 7b
class AlarmClock extends PrecisionClock{
    constructor(prefix, precision = 1000, wakeUpTime = "7:00"){
        super(prefix, precision);
        this.wakeUpTime = wakeUpTime;
    }
    display(){
        super.display();
        let date = new Date();
        let hours = date.getHours();
        let mins = date.getMinutes();
        if (`${hours}:${mins}` === this.wakeUpTime) {
            console.log("Wake Up");
            super.stop();
        }
    }

}

const alarming = new AlarmClock("Alarm Clock", 1000, "10:15")
alarming.start();

// ------------------------------------------------ Exercise 8 ------------------------------------------------ //

console.log("");

function orderItems(itemName) {
  return `Order placed for: ${itemName}`;
}

// 8a
function validateStringArg(fn) {
  // takes in function
  return function (arg) {
    // this argument from the original function
    if (typeof arg !== "string") {
      throw new Error("Argument must be a string"); // error thrown if not a string
    }
    return fn(arg); // if no error, return original function
  };
}

// create a decorated version of the original function
const validatedOrderItem = validateStringArg(orderItems);
try {
  console.log(validatedOrderItem("Apple Watch")); // should run the function
} catch (error) {
  console.error(error.message);
}
try {
  console.log(validatedOrderItem(123)); // should throw an error
} catch (error) {
  console.error(error.message);
}

// 8b
function orderItemsRest(...args) {
  return `Order placed for: ${args.join(", ")}`;
}

// 8c
function validateStringArgRest(fn) {
  return function (...args) {
    for (let arg of args) {
      if (typeof arg !== "string") {
        throw new Error("All arguments must be strings");
      }
    }
    return fn(...args);
  };
}

const validatedOrderItemsRest = validateStringArgRest(orderItemsRest);
try {
  console.log(validatedOrderItemsRest("Apple Watch", "iPhone")); // should run the function
} catch (error) {
  console.error(error.message);
}
try {
  console.log(validatedOrderItemsRest("Apple Watch", 123)); // should throw an error
} catch (error) {
  console.error(error.message);
}

// ------------------------------------------------ Exercise 9 ------------------------------------------------ //

console.log("");

// 9a
function randomDelay() {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 20000) + 1000;
        console.log(delay);
        setTimeout(resolve, delay);
    });
}

randomDelay().then(() => console.log("There appears to have been a delay."));

// 9b, 9c, 9d
function randomDelayEven() {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 20000) + 1000;
        console.log(delay);
        if (delay % 2 === 0) {
            setTimeout(() => resolve(delay), delay);
        } else {
            setTimeout(() => reject(new Error(`Odd delay of ${delay}ms, promise rejected`)), delay);
        }
    });
}

randomDelayEven()
    .then((delay) => console.log(`There appears to have been a successful delay of ${delay}ms.`))
    .catch((error) => console.error(error.message));

// ------------------------------------------------ Exercise 10 ------------------------------------------------ //

console.log("");

// run 'npm init' and accept all the defaults
// run 'npm install node-fetch'
// run 'npm pkg set type=module'
import fetch from "node-fetch";
globalThis.fetch = fetch;
function fetchURLData(url) {
  let fetchPromise = fetch(url).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  });
  return fetchPromise;
}

fetchURLData('https://jsonplaceholder.typicode.com/todos/1')
.then(data => console.log(data))
.catch(error => console.error(error.message));

fetchURLData('https://www.google.com')
.then(data => console.log(data))
.catch(error => console.error(error.message));


// 10a
async function fetchURLDataAsync(url) {
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        // console.error(error);
        throw error; // is this right?
    }
}

// 10b
fetchURLDataAsync('https://jsonplaceholder.typicode.com/todos/1')
.then(data => console.log(data))
.catch(error => console.error(error.message));

fetchURLDataAsync('https://www.google.com')
.then(data => console.log(data))
.catch(error => console.error(error.message)); // should I output the error here or as part of the function?

// 10c

async function fetchURLDataAsyncAll(urls) {
    const results = await Promise.allSettled(urls.map(url => 
        fetch(url).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Request failed with status ${response.status} for URL: ${url}`);
            }
        })
    ));

    results.forEach(result => {
        if (result.status === 'fulfilled') {
            console.log('Success:', result.value);
        } else {
            console.error('Error:', result.reason.message);
        }
    });
}

// Test the function
const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3',
    'https://www.google.com'
];

fetchURLDataAsyncAll(urls);


