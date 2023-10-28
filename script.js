

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

//Call this for initial setup for displaying all saved books
iterateMyLibrary(myLibrary);

//Adds book from array[-1] (most recently added book)
function addNewBookFromArray(array) {
  addCardFromArray(array[array.length - 1]);
}

//3. Modal
let dialog = document.querySelector("dialog");
let open_modal = document.querySelector(".new_book_button");

open_modal.addEventListener("click", () => {
  document.querySelector("dialog").showModal();
})

let close_modal = document.querySelector(".close_book_button");

close_modal.addEventListener("click", () => {
  document.querySelector("dialog").close();
})

//Close modal if clicked outside (blank space)
dialog.addEventListener("click", (event) => {

  dialog = document.querySelector("dialog");
  dialog_dimensions = dialog.getBoundingClientRect();

  if (event.clientX < dialog_dimensions.x || 
      event.clientX > dialog_dimensions.x + dialog_dimensions.width ||
      event.clientY > dialog_dimensions.y + dialog_dimensions.height ||
      event.clientY < dialog_dimensions.y) {
        dialog.close();
      }
})

//4. Form input
let onSubmitForm = () => {
  //1. Collect data
  let submit_title = document.querySelector("#title").value;
  let submit_author = document.querySelector("#author").value;
  let submit_pages = document.querySelector("#pages").value;
  //TODO: radio button for read state

  //2. Create new object from data
  let new_book = new Book(submit_title, submit_author, submit_pages);

  //3. Append new data into myLibrary[]
  myLibrary.push(new_book);

  //4. Update book_cards with new book from myLibrary[]
  addNewBookFromArray(myLibrary);

  //5. Clear form
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";


  //console.log(`${submit_title}, ${submit_author}, ${submit_pages},`)

  
}

//Submit button
document.querySelector(".submit_button").addEventListener("click", (event) => {
  event.preventDefault();
  onSubmitForm();
})
//Enter button
document.querySelector("dialog").addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    event.preventDefault();
    onSubmitForm();
  }
})