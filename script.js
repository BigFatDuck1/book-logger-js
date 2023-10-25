

//1. Book information handling

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

//Appends book details to array
function addBookToLibrary(title, author, pages, read) {

    let output = new Book(title, author, pages, read);

    myLibrary.push(output);

    return output;
  
}

console.log(addBookToLibrary("For Whom The Bells Toll", "Ernest Hemingway", 100,"read"))
console.log(myLibrary)

//2. Turning information into card and adding it to page

let book_cards_container = document.querySelector(".book_cards");

//This function creates a card given the book details
let addCardFromArray = (book_details) => {
  //Create div
  let new_card = document.createElement("div");
  new_card.textContent = "Hello world!";
  //Append div to container
  book_cards_container.appendChild(new_card);
}

for (let i = 0; i < 20; i++) {
  addCardFromArray();
}