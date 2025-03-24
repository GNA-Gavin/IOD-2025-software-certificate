// ------------------------------------------------ Exercise 1 ------------------------------------------------ //

// console.log("");
// console.log("Exercise 1: \n");

// function makeCounter() {
//   let currentCount = 0;
//   return function () {
//     currentCount++;
//     console.log(currentCount);
//     return currentCount;
//   };
// }
// let counter1 = makeCounter();
// counter1(); // 1
// counter1(); // 2

// let counter2 = makeCounter();
// counter2();
// counter2();
// counter1();
// counter1();
// counter1();
// counter2();

// function makeCounterwithStartFrom(startFrom) {
//   let currentCount = startFrom;
//   return function () {
//     currentCount++;
//     console.log(currentCount);
//     return currentCount;
//   };
// }

// let counter3 = makeCounterwithStartFrom(3);
// counter3();
// counter3();

// function makeCounterwithIncrement(startFrom, increment) {
//   let currentCount = startFrom;
//   let i = increment;
//   return function () {
//     currentCount += i;
//     console.log(currentCount);
//     return currentCount;
//   };
// }

// let counter4 = makeCounterwithIncrement(5, 10);
// counter4();
// counter4();

// ------------------------------------------------ Exercise 2 ------------------------------------------------ //

// console.log("");
// console.log("Exercise 2: \n");

// function delayMsg(msg) {
//   console.log(`This message will be printed after a delay: ${msg}`);
// }
// setTimeout(delayMsg, 100, "#1: Delayed by 100ms \n"); // fourth
// setTimeout(delayMsg, 20, "#2: Delayed by 20ms"); // third
// setTimeout(delayMsg, 0, "#3: Delayed by 0ms"); // seconf
// delayMsg("#4: Not delayed at all"); // first

// const delayMsgArrow = (msg) => {
//   console.log(`This message will be printed after a delay: ${msg}`);
// };
// setTimeout(delayMsgArrow, 200, "#1: Delayed by 200ms");
// setTimeout(delayMsgArrow, 120, "#2: Delayed by 120ms");
// setTimeout(delayMsgArrow, 115, "#3: Delayed by 115ms");

// let timeoutID = setTimeout(delayMsg, 11000, "#5: Delayed by 11000ms");
// clearTimeout(timeoutID);

// // ------------------------------------------------ Exercise 3 ------------------------------------------------ //

// console.log("");

// function debounce(func) {
//   let timeout;
//   return function () {
//     clearTimeout(timeout);
//     timeout = setTimeout(func, 1000); // If setTimeout is not assigned to a variable, the clearTimeout function won't be able to clear the previous timeout.
//     // This means that the func will be called multiple times after the specified delay, instead of being debounced.
//     // it needs to be outside of the function so it is 'cached'
//   };
// }

// function printMe() {
//   console.log("printing debounced message");
// }

// printMe = debounce(printMe);

// //fire off 3 calls to printMe within 300ms - only the LAST one should print, after
// //1000ms of no calls
// setTimeout(printMe, 100);
// setTimeout(printMe, 200);
// setTimeout(printMe, 300);

// function debounceMs(func, ms) {
//   let timeout;
//   return function () {
//     clearTimeout(timeout);
//     timeout = setTimeout(func, ms);
//   };
// }

// function printMe2() {
//     console.log("printing debounced message 2");
//   }

// printMe2 = debounceMs(printMe2,5000);

// setTimeout(printMe2, 100);
// setTimeout(printMe2, 200);
// setTimeout(printMe2, 300);

// function debounceWithArgs(func, ms) {
//     let timeout;
//     return function debounceReturn () {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func.apply(this, arguments), ms); // the apply is needed to bind the context and pass in arguments for the function
//     };
// }

// function printMeWithArgs(msg) {
//     console.log(`${msg}`);
// }

// printMeWithArgs = debounceWithArgs(printMeWithArgs, 6000);

// setTimeout(() => printMeWithArgs("Hello 1"), 100); // cannot use bind since a the decorator function returns an unnamed function
// setTimeout(() => printMeWithArgs("Hello 2"), 200); // need to wrap in a new function
// setTimeout(() => printMeWithArgs("Hello 3"), 300); // wait we can return a named function? let's try it!

// function debounceWithArgsBind(func, ms) {
//     let timeout;
//     function debounceReturn () {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func.apply(this, arguments), ms);
//     }
//     return debounceReturn;
// }

// function printMeWithArgsBind(msg) {
//     console.log(`${msg}`);
// }

// printMeWithArgsBind = debounceWithArgsBind(printMeWithArgsBind, 6000); // could not get a bind to work here

// setTimeout(printMeWithArgsBind.bind(debounceWithArgsBind, "Hello 4"), 400);
// setTimeout(printMeWithArgsBind.bind(debounceWithArgsBind, "Hello 5"), 500);
// setTimeout(printMeWithArgsBind.bind(debounceWithArgsBind, "Hello 6"), 600);

// ------------------------------------------------ Exercise 4 ------------------------------------------------ //

console.log("");

// function printFibonacci() {
//   let fib = 1;
//   let last = 0;
//   let counter = 1;
//   let intervalTimer = setInterval(() => {
//     let next = fib + last;
//     console.log(next);
//     last = fib;
//     fib = next;
//     if (counter >= 10) {
//       clearInterval(intervalTimer);
//     }
//     counter++;
//   }, 1000);
// }

// printFibonacci();

// function printFibonacciTimeouts() {
//   let fib = 1;
//   let last = 0;
//   let counter = 1;
//   setTimeout(function repeat() {
//     let next = fib + last;
//     console.log(next);
//     last = fib;
//     fib = next;
//     counter++;
//     if(counter < 10) setTimeout(repeat, 1000);
//   });
// }

// printFibonacciTimeouts();

// function printFibonacciLimit(limit) {
//   let fib = 1;
//   let last = 0;
//   let counter = 1;
//   let intervalTimer = setInterval(() => {
//     let next = fib + last;
//     console.log(next);
//     last = fib;
//     fib = next;
//     if (counter >= limit) {
//       clearInterval(intervalTimer);
//     }
//     counter++;
//   }, 1000);
// }

// printFibonacciLimit(10);

// function printFibonacciTimeoutsLimit(limit) {
//     let fib = 1;
//     let last = 0;
//     let counter = 0;
//     setTimeout(function repeat() {
//       let next = fib + last;
//       console.log(next);
//       last = fib;
//       fib = next;
//       counter++;
//       if(counter < limit) setTimeout(repeat, 1000);
//     });
//   }

//   printFibonacciTimeoutsLimit(6);

// ------------------------------------------------ Exercise 5 ------------------------------------------------ //

// console.log("");

// let car = {
//   make: "Porsche",
//   model: "911",
//   year: 1964,
//   description() {
//     console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
//   },
// };
// car.description(); //works
// setTimeout(car.description, 200); //fails
// // fails since the function is passed by reference instead of beingc called directly --> context (this) is lost

// // 5a
// setTimeout(() => {
//   car.description();
// }, 200); // wrapping functio inside a function to call directly

// // 5b
// let newCar = { ...car, year: 2023 };
// setTimeout(() => {
//   newCar.description();
// }, 300); // new value used since newCar is a different instance of car object

// // 5 c
// const boundDescriptionCar = car.description.bind(car);
// setTimeout(boundDescriptionCar, 400);
// // or
// setTimeout(newCar.description.bind(newCar), 500);

// // 5d
// let anotherCar = { ...car, make: "Ferrari" };
// setTimeout(() => {
//   anotherCar.description();
// }, 600);

// setTimeout(boundDescriptionCar, 700); // nound value still associated with car (not anotherCar or newCar)

// ------------------------------------------------ Exercise 5 ------------------------------------------------ //

console.log("");

function multiply(a, b) {
  console.log(a * b);
}

Function.prototype.delay = function(ms) {
    let func = this;
    return function(...args) {
        setTimeout(() => func.apply(this, args), ms);
    };
};

multiply.delay(500)(5, 5); // prints 25 after 500 milliseconds
