const showBtn = document.querySelector("#add-book");
const dialog = document.querySelector("#dialog");
const add = document.querySelector("#add");
const close = document.querySelector("#close");
const myLibrary = [];
let bookshelf = document.querySelector("#bookshelf");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    console.log(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read + " yet");
  }
}

Book.prototype.toggleRead = function() {
  if (this.read === "read") {
    this.read = "not read";
  } else if (this.read === "not read") {
    this.read = "read";
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const theLordOfTheRings = new Book("The Lord of the Rings", "JRR Tolkien", 1216, "not read");
const theHobbit = new Book("The Hobbit", "JRR Tolkien", 295, "read");
addBookToLibrary(theHobbit);
addBookToLibrary(theLordOfTheRings);

function emptyBookshelf() {
  let length = bookshelf.rows.length;
  for(var i = 1; i < length; i++){
    bookshelf.deleteRow(-1);
    }
}
function createBookshelf() {
  emptyBookshelf();
  for (let book of myLibrary) {
    let row = document.createElement("tr");
    let element1 = document.createElement("td");
    element1.textContent = book.title;
    row.appendChild(element1);
    let element2 = document.createElement("td");
    element2.textContent = book.author;
    row.appendChild(element2);
    let element3 = document.createElement("td");
    element3.textContent = book.pages;
    row.appendChild(element3);
    let element4 = document.createElement("td");
    element4.textContent = book.read;
    row.appendChild(element4);
    let remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.setAttribute("type", "button");
    remove.setAttribute("class", "remove");
    remove.addEventListener("click", (e) => {
      myLibrary.splice(myLibrary.indexOf(book), 1);
      createBookshelf();
    })
    let toggle = document.createElement("button");
    toggle.textContent = "Toggle read";
    toggle.addEventListener("click", (e) => {
      book.toggleRead();
      createBookshelf();
    })
    row.appendChild(remove);
    row.appendChild(toggle);
    bookshelf.appendChild(row);
  }
}

showBtn.addEventListener("click", () => {
  dialog.showModal();
});

add.addEventListener("click", (e) => {
  e.preventDefault();
  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");
  const pagesInput = document.querySelector("#pages");
  const readInput = document.querySelector("#read");
  if (titleInput.value !== "" && authorInput.value !== "" && pagesInput.value !== "") {
    let readValue = ""
    if (readInput.value === "read") {
      readValue = "read";
    } else {
      readValue = "not read";
    }
    let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readValue);
    addBookToLibrary(newBook);
    createBookshelf();
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    dialog.close();
  } else {
    alert("Please fill out fields correctly");
  }
});

close.addEventListener("click", (e) => {
  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");
  const pagesInput = document.querySelector("#pages");
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  dialog.close();
})

createBookshelf();