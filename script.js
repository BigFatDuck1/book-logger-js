

//1. Book information handling

//All books are stored in this array
const myLibrary = [];

//Just an array that has all intergers in string 
let number_array = ["0"];
for (let i = 1; i < 10; i++) {
  number_array.push(i.toString());
}

//Constructor function
function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  //Unread, Reading, Completed, Wishlist
  this.read = read
}

//Global variable to store index of newest added book
//So it can be incorporated into data-attribute later
let latest_index = myLibrary.length - 1;
if (myLibrary.length == 0) {
  latest_index = 0;
}

//Appends book information to array
function addBookToLibrary(title, author, pages, read) {

    let output = new Book(title, author, pages, read);

    myLibrary.push(output);

    return output;
  
}

//! Keep this for debug purposes
console.log(addBookToLibrary("For Whom The Bells Toll", "Ernest Hemingway", "100", "Completed"))
console.log(addBookToLibrary("For Whom The Bells Toll", "Ernest Hemingway", "100", "Completed"))
console.log(addBookToLibrary("For Whom The Bells Toll", "Ernest Hemingway", "100", "Completed"))
console.log(addBookToLibrary("For Whom The Bells Toll", "Ernest Hemingway", "100", "Completed"))

//2. Turning information into card and adding it to page

let book_cards_container = document.querySelector(".book_cards");

//This function creates a card given the book information
let addCardFromArray = (book_info) => {
  //Create div
  let new_card = document.createElement("div");
  //Add data attribute
  new_card.dataset.index = latest_index;
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
      info.textContent = `${book_info[item]}`;
    }
    else if (item == "bookmark") {
      info.textContent = `Currently at page ${book_info[item]}`
    }
    else {
      info.textContent = `${book_info[item]}`;
    }
    //Append the info as a div
    new_card.appendChild(info)
  }
  //Add Delete button 
  let delete_button = document.createElement("button");
  delete_button.textContent = "Delete";
  delete_button.classList.add("delete_button");
  new_card.appendChild(delete_button);
  //Append div to container
  book_cards_container.appendChild(new_card);
}

//Iterates over each item in myLibrary[]
//Call this in the beginning when the app starts
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
let open_modal_button = document.querySelector(".new_book_button");

//Button opens modal
open_modal_button.addEventListener("click", () => {
  document.querySelector("dialog").showModal();
})
//Pressing a also opens modal
document.addEventListener("keydown", (event) => {
  if (event.key == "a") {
    if (document.querySelector("dialog").open == false) {
      dialog.showModal();
      //To prevent "a" from appearing in input field after pressing a to open new window
      event.preventDefault();
    }
    
  }

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
  
  //Error handling (input validation)
  if (submit_title == "" || submit_author == "" || submit_pages == "") {
    /* //TODO: give signal to user that he hasn't finished filling in the form 
    e.g. turn input boxes red */
    return "Incomplete form";
  }
  if (document.querySelector("#reading").checked == true && document.querySelector("#bookmark").value == "") {
    //TODO: give signal that user hasn't filled in what page they are at (bookmark)
    return "Incomplete bookmark";
  }
  let bookmark_value = document.querySelector("#bookmark").value;
  if (document.querySelector("#reading").checked == true && Number.isNaN(parseInt(bookmark_value)) == true) {
    //TODO: tell user they have entered an invalid bookmark page number ("reading state")
    console.log("blocked")
    return "Invalid page number (NaN) in bookmark";
  }
  if (Number.isNaN(parseInt(submit_pages)) == true) {
    //User didn't input a number for pages
    //TODO: tell user they entered an invalid page number
    return "Invalid page number (NaN)";
  }

  let submit_state;
  if (document.querySelector("#unread").checked == true) {
    submit_state = "Unread";
  }
  else if (document.querySelector("#reading").checked == true) {
    submit_state = "Reading";
  }
  else if (document.querySelector("#read").checked == true) {
    submit_state = "Finished";
  }
  else if (document.querySelector("#want").checked == true) {
    submit_state = "Wishlist";
  }

  //2. Create new object from data
  let new_book = new Book(submit_title, submit_author, submit_pages, submit_state);
  //2. If reading, add bookmark
  if (document.querySelector("#bookmark").value != "") {
    new_book.bookmark = document.querySelector("#bookmark").value;
  }

  //3. Append new data into myLibrary[]
  myLibrary.push(new_book);
  //7. Stores the index of most recently added book into a global variable so it can be incorporated into a data attribute later
  latest_index = myLibrary.length - 1;

  //4. Update book_cards with new book from myLibrary[]
  addNewBookFromArray(myLibrary);

  //5. Clear form
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";

  //6. Close modal
  document.querySelector("dialog").close();

  return 0;
}

//Expand accordion if state is "reading"
document.querySelector("dialog").addEventListener("click", () => {
  let bookmark_section = document.querySelector(".bookmark");
  if (document.querySelector("#reading").checked == true) {
    bookmark_section.style.display = "block";
  }
  else {
    bookmark_section.style.display = "none";
  }
})

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