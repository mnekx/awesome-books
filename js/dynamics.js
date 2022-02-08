let books = [];
class Book {
  static id = -1;

  constructor(title, author) {
    this.title = title;
    this.author = author;
    Book.id += 1;
    this.idx = Book.id;
  }
}

function setInputs() {
  books = JSON.parse(localStorage.getItem('books'));
}

function populateStorage() {
  localStorage.setItem('books', JSON.stringify(books));
  setInputs();
}

function addBook(title, author) {
  const book = new Book(title, author);
  books.push(book);
}

function remove(id) {
  books = books.filter((item) => item.idx !== parseInt(id, 10));
}

class Node {
  constructor(data = null, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor(head = null, tail = null) {
    // super()
    this.head = head;
    this.tail = tail;
    this.length = 0;
  }

  addEnd(data) {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
      this.length += 1;
    }
  }

  remove(id) {
    let temp = this.head;
    if (this.head.data.idx === parseInt(id, 10)) {
      this.head = this.head.next;
    } else {
      while (temp.next !== null) {
        if (temp.next.data.idx === parseInt(id, 10)) {
          temp.next = temp.next.next;
          return;
        }
        temp = temp.next;
      }
    }
  }

  display() {
    let temp = this.head;
    while (temp !== null) {
      temp = temp.next;
    }
  }
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
                                    <button id=${book.idx} class='remove'>Remove</button>
                                    <hr />
                                    </li>`;
  });

  const removeButtons = document.querySelectorAll('.remove');

  removeButtons.forEach((rb) => rb.addEventListener('click', () => {
    remove(rb.id);
    populateStorage();
    displayBooks(books);
  }));
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
  displayBooks(books);
});

addBookButton.addEventListener('click', () => {
  addBook(bookTitle.value, bookAuthor.value);
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
