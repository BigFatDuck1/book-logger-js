
//All books are stored in this array
const myLibrary = [];

//Constructor function
function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  //Want, Reading, Completed
  this.read = read
}

function addBookToLibrary(title, author, pages, read) {

    let output = new Book(title, author, pages, read);

    myLibrary.push(output);

    return output;
  
}

console.log(addBookToLibrary("For Whom The Bells Toll", "Ernest Hemingway", 100,"read"))
console.log(myLibrary)