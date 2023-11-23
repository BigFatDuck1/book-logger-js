

//1. Book information handling

//All books are stored in this array
const myLibrary = [];

//Just an array that has all intergers in string 
let number_array = ["0"];
for (let i = 1; i < 10; i++) {
  number_array.push(i.toString());
}

//Constructor function
// function Book(title, author, pages, read) {
//   this.title = title,
//   this.author = author,
//   this.pages = pages,
//   this.read = read
// }

class Book {
  constructor(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    //Unread, Reading, Completed, Wishlist
    this.read = read
  }
}

//Appends book information to array
function addBookToLibrary(title, author, pages, read) {

    let output = new Book(title, author, pages, read);

    myLibrary.push(output);

    return output;
  
}

//! Keep this for debug and testing purposes
addBookToLibrary("For Whom The Bells Toll", "Ernest Hemingway", "100", "Finished");
addBookToLibrary("Old Man and the Sea", "Ernest Hemingway", "100", "Finished");
addBookToLibrary("The Grapes of Wrath", "John Steinbeck", "100", "Wishlist");
addBookToLibrary("Brave New World", "Aldous Huxley", "100", "Unread");
addBookToLibrary("Very very very very very very very very very very very long title", "Author", "200", "Reading");
myLibrary[4].bookmark = "50";

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
      info.classList.add("pages_div");
      info.textContent = `${book_info[item]} pages`;
    }
    else if (item == "read") {
      info.classList.add("state_div");
      info.textContent = `${book_info[item]}`;
    }
    else if (item == "bookmark") {
      info.classList.add("bookmark_div");
      info.textContent = `Currently at page ${book_info[item]}`
    }
    else if (item == "title") {
      info.textContent = `${book_info[item]}`
      info.classList.add("title_div");
    }
    else if (item == "author") {
      info.textContent = `${book_info[item]}`;
      info.classList.add("author_div")
    }
    else {
      info.textContent = `${book_info[item]}`;
    }
    //Append the info as a div
    new_card.appendChild(info)
  }
  //Add state buttons
  let state_buttons_divs = addStateButtons(book_info["read"]); //Array of state buttons
  state_buttons_divs.forEach((button) => {
    new_card.appendChild(button)
  })

  //Add Delete button 
  let delete_button = document.createElement("button");
    //Change this to a trashcan icon
  //delete_button.textContent = "Delete";
  delete_button.innerHTML = "<img src='assets/black_feather/trash-2.svg' class='icon'>"
  delete_button.classList.add("delete_button");
  new_card.appendChild(delete_button);
  //Append div to container
  book_cards_container.appendChild(new_card);
}

//Returns an array of all state buttons
function addStateButtons(state) {
  //State buttons: unread, reading, read (completed), want (wishlist)
  let unread_button = document.createElement("button");
  let reading_button = document.createElement("button");
  let read_button = document.createElement("button");
  let want_button = document.createElement("button");
  let state_buttons = [unread_button, reading_button, read_button, want_button];
  //Add class into button
  state_buttons.forEach((element) => {
    element.classList.add("state_buttons");
  })
  //Add data attribute that shows the function/state of the button
  unread_button.dataset.state = "Unread";
  reading_button.dataset.state = "Reading";
  read_button.dataset.state = "Finished";
  want_button.dataset.state = "Wishlist";


  //Change icon of button
  unread_button.innerHTML = "<img src='assets/black_feather/book.svg' class='icon'>"
  reading_button.innerHTML = "<img src='assets/black_feather/book-open.svg' class='icon'>"
  read_button.innerHTML = "<img src='assets/black_feather/check-square.svg' class='icon'>"
  want_button.innerHTML = "<img src='assets/black_feather/star.svg' class='icon'>"

  //Highlight state (I could have moved this up there but I am doing this for clarity) 
  state_buttons.forEach((element) => {
    if (state == element.dataset.state) {
      element.classList.add("highlight_state");
    }
  })

  return state_buttons;
  
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
  //myLibrary[-1] is passed as parameter
  addCardFromArray(array[array.length - 1]);
}

//3. Modal
let dialog = document.querySelector("dialog");
let open_modal_button = document.querySelector(".new_book_button");

//Button opens modal
open_modal_button.addEventListener("click", () => {
  removeErrorShadow();
  document.querySelector("dialog").showModal();
})
//Pressing a also opens modal
document.addEventListener("keydown", (event) => {
  if (event.key == "a") {
    if (document.querySelector("dialog").open == false) {
      dialog.showModal();
      removeErrorShadow();
      //To prevent "a" from appearing in input field after pressing a to open new window
      event.preventDefault();
    }
    
  }

})
//New book card
document.querySelector(".new_book_card").addEventListener("click", () => {
  removeErrorShadow();
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

let removeErrorShadow = () => {
  document.querySelector("dialog").classList.remove("form_error");
}
let addErrorShadow = () => {
  document.querySelector("dialog").classList.add("form_error");
  setTimeout(removeErrorShadow, 2000);
}

//4. Form input
let onSubmitForm = () => {

  removeErrorShadow();

  //1. Collect data
  let submit_title = document.querySelector("#title").value;
  let submit_author = document.querySelector("#author").value;
  let submit_pages = document.querySelector("#pages").value;
  
  //Error handling (input validation)
  if (submit_title == "" || submit_author == "" || submit_pages == "") {
    /* give signal to user that he hasn't finished filling in the form 
    e.g. turn input boxes red */
    addErrorShadow();
    return "Incomplete form";
  }
  if (document.querySelector("#reading").checked == true && document.querySelector("#bookmark").value == "") {
    //give signal that user hasn't filled in what page they are at (bookmark)
    addErrorShadow();
    return "Incomplete bookmark";
  }
  let bookmark_value = document.querySelector("#bookmark").value;
  if (document.querySelector("#reading").checked == true && Number.isNaN(parseInt(bookmark_value)) == true) {
    //tell user they have entered an invalid bookmark page number ("reading state")
    addErrorShadow();
    return "Invalid page number (NaN) in bookmark";
  }
  if (Number.isNaN(parseInt(submit_pages)) == true) {
    //User didn't input a number for pages
    addErrorShadow();
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
  //2.1 If reading, add bookmark
  if (document.querySelector("#bookmark").value != "") {
    new_book.bookmark = document.querySelector("#bookmark").value;
  }

  //3. Append new data into myLibrary[]
  myLibrary.push(new_book);

  //4. Update book_cards with new book from myLibrary[]
  addNewBookFromArray(myLibrary);

  //5. Clear form
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#bookmark").value = "";

  //6. Close modal
  document.querySelector("dialog").close();

  //Attach event listener to the state button
  attachStateButton();
  //Attach event listener to the delete button
  attachDeleteButton();  

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

//5. Delete button for each card
function attachDeleteButton() {
  let all_delete_buttons = document.querySelectorAll(".delete_button")

  all_delete_buttons.forEach((element) => {
    //Attach event listener to each delete button
    element.addEventListener("click", function() {
      //Get parent of the delete button and store the title of the book
      let parent = this.parentElement;
      let parent_title = this.parentElement.firstChild.textContent;
      //Store the index of the relevant entry 
      let parent_index = myLibrary.findIndex(element => element.title == parent_title)
      //1. Remove element from myLibrary[] array
      myLibrary.splice(parent_index, 1);
      //2. Remove the element itself
      parent.remove();
    })  
  });
}
  //On startup, attach event listeners to all present delete buttons
attachDeleteButton();

//6. Add event listeners to state button
function attachStateButton() {
  let state_button_array = document.querySelectorAll(".state_buttons");
  state_button_array.forEach((button) => {
    button.addEventListener("click", function() {
      //Get title of the book this button comes from
      let parent = this.parentElement;
      let parent_title = this.parentElement.firstChild.textContent;
      // Determine what state the button is (unread, reading, read, wishlist)
      let button_state = this.dataset.state;
      //1. Change state of element in myLibrary[]
      let current_index = myLibrary.findIndex(element => element.title == parent_title);
      myLibrary[current_index].read = button_state;
      //2. Update description
      parent.children[3].textContent = button_state;
        //Highlights the state of the book
      for (const child of parent.children) {
        child.classList.remove("highlight_state");
      };
      this.classList.add("highlight_state");

    })
  })
}
attachStateButton();

//7. Highlight selected radio in modal
document.querySelector(".state_input").addEventListener("click", function() {
  let modal_radios = document.querySelectorAll("input[type='radio']");

  modal_radios.forEach((element) => {
    if (element.checked == true) {
      element.parentElement.children[1].classList.add("select_state");
    }
    else {
      element.parentElement.children[1].classList.remove("select_state");
    }
  })
})

