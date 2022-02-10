let navLinks = document.querySelectorAll('.nav-link');
let contentSections = document.querySelectorAll('.content');
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
        console.log(selectedSection);
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
        console.log(selectedSection);
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
        console.log(selectedSection);
      });
      break;
    default:
      break;
  }
});