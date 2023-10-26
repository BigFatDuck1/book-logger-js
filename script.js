

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

//Appends book information to array
function addBookToLibrary(title, author, pages, read) {

    let output = new Book(title, author, pages, read);

    myLibrary.push(output);

    return output;
  
}

//! Keep this for debug purposes
console.log(addBookToLibrary("For Whom The Bells Toll", "Ernest Hemingway", 100,"read"))

//2. Turning information into card and adding it to page

let book_cards_container = document.querySelector(".book_cards");

//This function creates a card given the book information
let addCardFromArray = (book_info) => {
  //Create div
  let new_card = document.createElement("div");
  //Append class
  new_card.classList.add("card");
  //Add title, author, pages, read as a child div
  for (const item in book_info) {
    //? item is the key
    //? book_info[item] gives the value
    //? use for ...in with objects
    //? use for ...of with arrays
    //Create a div
    let info = document.createElement("div");
    //Put the info into the div
    info.classList.add("info");
    // TODO: Change this line to style the card (e.g. labels and info have different styles)
    //TODO: can wrap info with a span
    if (item == "pages") {
      info.textContent = `${book_info[item]} pages`;
    }
    else if (item == "read") {
      //TODO: Change icon of card depending on read state (unread, completed, wishlist)
      info.textContent = `State: ${book_info[item]}`;
    }
    else {
      info.textContent = `${book_info[item]}`;
    }
    //Append the info as a div
    new_card.appendChild(info)
  }
  //Append div to container
  book_cards_container.appendChild(new_card);
}

//Iterates over each item in myLibrary[]
function iterateMyLibrary(array) {
  for (let i = 0; i < array.length; i++) {
    addCardFromArray(array[i]);
  }
}

iterateMyLibrary(myLibrary);

//3. Open modal
let open_modal = document.querySelector(".new_book_button");

open_modal.addEventListener("click", () => {
  document.querySelector("dialog").showModal();
})
