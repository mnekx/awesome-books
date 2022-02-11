let navLinks = document.querySelectorAll('.nav-link');
let contentSections = document.querySelectorAll('.content');
let mainSection = document.querySelector('#main-section');
let bookList = document.querySelector('#book-list');
const addBookBtn = document.querySelector('#add-book');
const addBookForm = document.querySelector('#add-book-form');
let removebtns = document.querySelectorAll('.btn-remove');

class Book {
    static counter = 0;
    constructor(title, author) {
        this.title = title;
        this.author = author;
        Book.counter += 1;
        this.id = Book.counter
    }
}

class BookCollection {
    constructor() {
        this.collection = [];
        this.book = new Book('', '');
    }

    add(book) {
        this.collection.push(book)
    }

    remove(id) {
        this.collection = this.collection.filter(book=>book.id !== parseInt(id))
    }

    setBooks(collection) {
        this.collection = collection;
        Book.counter = collection.length
        console.log(Book.counter);
    }

    getBooks() {
        return this.collection;
    }

    renderList() {
        if(this.collection.length === 0) {
            var pEmpty = document.createElement('p');
            pEmpty.innerText = 'List is Empty!';
            pEmpty.id = 'p-empty';
            mainSection.appendChild(pEmpty);
            
            if(bookList) {
                bookList.classList.remove('d-block');
                bookList.classList.add('d-none');
            }
        } else {
            let pEmpty = document.querySelector('#p-empty')
            if(pEmpty) {
                mainSection.removeChild(pEmpty);
            }
            if(!bookList) {
                bookList = document.createElement('ul');
            }
            bookList.classList.add('d-block');
            bookList.classList.remove('d-none');
            bookList.id = 'book-list';
            mainSection.appendChild(bookList);
            bookList.innerHTML = ``;
            this.collection.forEach(book=>{
                bookList.innerHTML += `<li id="book-li-${book.id}" class="d-flex">
                <span>"${book.title}" by "${book.author}"</span>
                <button id="remove-btn-${book.id}" class="btn btn-danger btn-remove">Remove</button>
              </li>`
            })
            // Add event listeners for removal buttons
            removebtns = document.querySelectorAll('.btn-remove');
            this.addRemoveListerners(removebtns);
        }
    }

    addRemoveListerners(removebtns) {
        removebtns = Array.from(removebtns);
        console.log(removebtns)
            removebtns.forEach(btn=>{
                btn.addEventListener('click', (e) => {
                    console.log(btn.id)
                })
            })
    }
}

function removeLi(li) {
li.classList.add('close-book-li');
li.remove();
}

navLinks = Array.from(navLinks);
contentSections = Array.from(contentSections);
navLinks.forEach((link, key) => {
  contentSections.forEach((section) => {
    section.classList.remove('content-show');
    // section.classList.add('content-hide')
  });
  switch (key) {
    case 0: // List link selected
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedSection = document.querySelector('#main-section');
        contentSections.forEach((section) => {
          section.classList.remove('content-show');
          section.classList.add('content-hide');
        });
        selectedSection.classList.add('content-show');
        selectedSection.classList.remove('content-hide');
      });
      break;
    case 1: // List link selected
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedSection = document.querySelector('#new-book-section');
        contentSections.forEach((section) => {
          section.classList.remove('content-show');
          section.classList.add('content-hide');
        });
        selectedSection.classList.add('content-show');
        selectedSection.classList.remove('content-hide');
      });
      break;
    case 2: // List link selected
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedSection = document.querySelector('#contact-section');
        contentSections.forEach((section) => {
          section.classList.remove('content-show');
          section.classList.add('content-hide');
        });
        selectedSection.classList.add('content-show');
        selectedSection.classList.remove('content-hide');
      });
      break;
    default:
      break;
  }
});

const books = new BookCollection();


// Local Storage
function setInputs() {
    const booksArr = JSON.parse(localStorage.getItem('books'));
    books.setBooks(booksArr);
  }
  
  function populateStorage() {
    localStorage.setItem('books', JSON.stringify(books.getBooks()));
    setInputs();
  }

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

  setInputs()
  books.renderList();

addBookForm.addEventListener('submit', e=> e.preventDefault());

addBookBtn.addEventListener('click', (e) => {
    const author = document.querySelector('#author');
    const title = document.querySelector('#title');
    const book = new Book(title.value, author.value);
    books.add(book);
    books.renderList();
    populateStorage()
    title.value = '';
    author.value = '';
    
})




