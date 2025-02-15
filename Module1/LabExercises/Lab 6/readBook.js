let book = require('./Book.json'); // this is needed to access the external .json file 

console.log(book);
console.log(book['title']);
console.log(book['description']);
console.log(book['Author']);;
console.log(book['Number of Pages']);

book['description'] = "A great short novel!!!";
console.log(book['description']);

console.log(book);

let book2 = {
  "title": "The Hobbit", 
  "description": "Smeagle",
  "Author": "JRR Tolkein",
  "Number of Pages": 350
}

console.log(book2)

let book3 = {
    "title": "One Punch Man", 
    "description": "When too much power is boring",
    "Author": "Yusuke Murata",
    "Number of Pages": 200
  }

  console.log(book3);

  let book4 = {
    "title": "The Lion, the Witch and the Wardrobe", 
    "description": "Magical wardrobe leads to fantasy land",
    "Author": "C. S. Lewis",
    "Number of Pages": 208
  }

  console.log(book4); 

  let book5 = {
    "title": "Nineteen Eighty-Four", 
    "description": "Big Brother is watching!",
    "Author": "George Orwell",
    "Number of Pages": 448
  }

  console.log(book5); 

  let books = [book, book2, book3, book4, book5];

  console.log(books);