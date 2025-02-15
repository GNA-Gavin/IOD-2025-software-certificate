let fruits = new Array();
console.log(fruits);

fruits.push("banana");
fruits.push("apple");
fruits.push("orange");


console.log(fruits);

let seas = ["Black Sea", "North Sea", "Baltic Sea",];
console.log(seas);
seas.push("Tasman Sea"); // push is to the end of the array
console.log(seas);
seas.unshift("Tasman sea"); // push is to the beginning to the array
console.log(seas);

let rivers = ['Mississippi', 'Amazon', 'Nile'];
let lastRiver = rivers.pop(); // removes the element at th end of an array
console.log(lastRiver); // Nile
console.log(rivers); // [ 'Mississippi', 'Amazon' ]

let firstRiver = rivers.shift(); // shift removes the element at the beginning of an array
console.log(firstRiver); // Mississippi
console.log(rivers); // [ 'Amazon' ]

let volcanoes = [ 'Mount Vesuvius', 'Mount Etna', 'Mount Fuji' ];
let fujiIndex = volcanoes.indexOf('Mount Fuji');
console.log(fujiIndex); // 2 (indexes start at 0)

let numVolcanoes = volcanoes.length;
console.log(numVolcanoes); // 3

console.log(seas.indexOf("North Sea"));
console.log(seas.length);
