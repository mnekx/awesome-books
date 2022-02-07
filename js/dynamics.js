class Book {
   static id = -1;

   constructor(title, author) {
     this.title = title;
     this.author = author;
     Book.id += 1;
     this.idx = Book.id;
   }
}

let books = [];

function addBook(title, author) {
  const book = new Book(title, author);
  books.push(book);
}

function remove(index) {
  books = books.filter(item, (idx) => idx !== index);
}

/* events */

const booksContainer = document.querySelector('.books');
const addBookButton = document.querySelector('#add-book');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookForm = document.querySelector('form');

function displayBooks(bookList) {
  booksContainer.innerHTML = '';
  bookList.forEach((book) => {
    booksContainer.innerHTML += `<li>
                                    <h2>${book.title}</h2>
                                    <h2>${book.author}</h2>
                                    <button onclick=remove(${book.idx})>Remove</button>
                                    <hr />
                                    </li>`;
  });
}
if (document.readyState !== 'loading') {
  
    displayBooks(books);
    
} else {
  document.addEventListener('DOMContentLoaded', () => {
    displayBooks(books);
  });
}

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('after submit', books);
  displayBooks(books);
});

addBookButton.addEventListener('click', (e) => {
  addBook(bookTitle.value, bookAuthor.value);
  console.log(books);
});
