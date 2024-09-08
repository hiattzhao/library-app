// const myLibrary = [{bookId: 3, title: "Book Title", author: "Hiatt", pages: 1234, hasRead: true}, {bookId: 4, title: "Book Title", author: "Hiatt", pages: 1234, hasRead: true}];

const myLibrary = [];

let id = 0;

function Book(title, author, pages, hasRead) {
    this.bookId = `book${++id}`;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

const ul = document.querySelector("ul");

function displayBooks() {
    ul.textContent = "";
    
    for (const book of myLibrary) {
        const h3 = document.createElement("h3");
        h3.textContent = `Title: ${book["title"]}`;
        const h4 = document.createElement("h4");
        h4.textContent = `Author: ${book["author"]}`;
        const p = document.createElement("p");
        p.textContent = `Pages: ${book["pages"]}`;
        const p2 = document.createElement("p");
        p2.textContent = `Read: ${book["hasRead"]}`;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteBook";
        deleteButton.onclick = deleteBook;
        const li = document.createElement("li");
        li.className = `${book.bookId}`;
        li.append(h3, h4, p, p2, deleteButton);
        
        ul.appendChild(li);
    }
}

function deleteBook() {
    const bookId = this.parentElement.className;

  const findBook = myLibrary.findIndex(
    (element) => element.bookId === bookId
  );
  myLibrary.splice(findBook, 1);
  this.parentElement.remove();
}

// displayBooks();

const showAddBookDialogButton = document.getElementById("ShowAddBookDialog");
const addBookDialogForm = document.getElementById("AddBookDialog");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookNotRead = document.getElementById("notRead");
const confirmButton = addBookDialogForm.querySelector("#confirmButton");

// "Show the dialog" button opens the <dialog> modally
showAddBookDialogButton.addEventListener("click", () => {
    addBookDialogForm.showModal();
});

let bookObj = {};

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
addBookDialogForm.addEventListener("close", (e) => {
    myLibrary.push(bookObj);
    displayBooks();
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmButton.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form
    let bookRead;
    if (bookNotRead.checked) {
        bookRead = false;
    } else {
        bookRead = true;
    }
        bookObj = {
            bookId: `book${++id}`,
            title: bookTitle.value,
            author: bookAuthor.value,
            pages: Number(bookPages.value),
            hasRead: bookRead
        }
    addBookDialogForm.close(bookObj); // Have to send the bookObj value here.
});
