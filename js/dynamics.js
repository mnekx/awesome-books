class Book {
  static id = -1;

  constructor(title, author) {
    this.title = title;
    this.author = author;
    Book.id += 1;
    this.idx = Book.id;
  }
}

class BookCollection {
  constructor() {
    this.books = [];
  }

  add(title, author) {
    let newBook = new Book(title, author);
    this.books.push(newBook);
  }

  remove(id) {
    this.books = this.books.filter(book=>book.idx !== parseInt(id, 10));
  }

  displayBooks(bookList) {
    booksContainer.innerHTML = '';
    this.books.forEach((book) => {
      booksContainer.innerHTML += `<li>
                                      <h2>${book.title}</h2>
                                      <h2>${book.author}</h2>
                                      <button id=${book.idx} class='remove'>Remove</button>
                                      <hr />
                                      </li>`;
    });
  
    const removeButtons = document.querySelectorAll('.remove');
  
    removeButtons.forEach((rb) => rb.addEventListener('click', () => {
      this.remove(rb.id);
      populateStorage();
      this.displayBooks();
    }));
  }

  getBooks() {
    return this.books
  }

  setBooks(books) {
this.books = books;
  }
}



function setInputs() {
  booksArr = JSON.parse(localStorage.getItem('books'));
  books.setBooks(booksArr);
}

function populateStorage() {
  localStorage.setItem('books', JSON.stringify(books.getBooks()));
  setInputs();
}

/* events */

let books;
const booksContainer = document.querySelector('.books');
const addBookButton = document.querySelector('#add-book');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookForm = document.querySelector('form');

if (document.readyState !== 'loading') {
  books = new BookCollection();
  books.displayBooks();
} else {
  books = new BookCollection();
  document.addEventListener('DOMContentLoaded', () => {
    books.displayBooks();
  });
}

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  books.displayBooks();
});

addBookButton.addEventListener('click', () => {
  books.add(bookTitle.value, bookAuthor.value);
  populateStorage();
});

// Local storage
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
    // everything except Firefox
      e.code === 22
            // Firefox
            || e.code === 1014
            // test name field too, because code might not be present
            // everything except Firefox
            || e.name === 'QuotaExceededError'
            // Firefox
            || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
            // acknowledge QuotaExceededError only if there's something already stored
            && (storage && storage.length !== 0);
  }
}

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  if (!localStorage.getItem('books')) {
    populateStorage();
  } else {
    setInputs();
  }
}
