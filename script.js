// const myLibrary = [{bookId: 3, title: "Book Title", author: "Hiatt", pages: 1234, hasRead: true}, {bookId: 4, title: "Book Title", author: "Hiatt", pages: 1234, hasRead: true}];

const myLibrary = [];

let id = 0;

function Book(title, author, pages, hasRead) {
    this.bookId = `book${++id}`;
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
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
        const span = document.createElement("span");
        span.textContent = "Read";
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", "hasRead");
        if (book["hasRead"]) {
            input.checked = true;
        }
        input.onclick = changeStatus;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteBook";
        deleteButton.onclick = deleteBook;
        const li = document.createElement("li");
        li.className = `${book.bookId}`;
        li.append(h3, h4, p, span, input, deleteButton);
        
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

const showAddBookDialogButton = document.getElementById("ShowAddBookDialog");
const addBookDialogForm = document.getElementById("AddBookDialog");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookRead = document.getElementById("hasRead");
const confirmButton = addBookDialogForm.querySelector("#confirmButton");

// "Show the dialog" button opens the <dialog> modally
showAddBookDialogButton.addEventListener("click", () => {
    addBookDialogForm.showModal();
});

let newBook;

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
addBookDialogForm.addEventListener("close", (e) => {
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmButton.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form
    let bookHasRead = bookRead.checked ? true : false;

    newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookHasRead);
    myLibrary.push(newBook);
    displayBooks();

    addBookDialogForm.close(newBook);

    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookRead.checked = false;
});

function changeStatus() {
    const thisBookId = this.parentElement.className;

    const thisBook = myLibrary.findIndex(
        (element) => element.bookId === thisBookId
    );
    myLibrary[thisBook].changeReadStatus();
}

Book.prototype.changeReadStatus = function() {
    if (this.hasRead === true) {
        this.hasRead = false;
    } else {
        this.hasRead = true;
    }
}