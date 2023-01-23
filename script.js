const nav = document.querySelector('nav');

// Initialize the previous scroll position
let previousScrollPosition = 0;

// Add a scroll event listener to the window
window.addEventListener('scroll', function() {
  // Get the current scroll position
  const currentScrollPosition = window.scrollY;

  // If the current scroll position is greater than the previous scroll position
  if (currentScrollPosition > previousScrollPosition) {
    // Hide the nav element
    nav.classList.remove('visible');
  } else {
    // Otherwise, show the nav element
    nav.classList.add('visible');
  }

  // Update the previous scroll position
  previousScrollPosition = currentScrollPosition;
});

// Get the top link in the nav
const topLink = nav.querySelector('.top-link');

// Add a click event listener to the top link
topLink.addEventListener('click', function(event) {
  // Prevent the default link behavior
  event.preventDefault();

  // Smoothly scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Get the scroll links in the nav
const scrollLinks = nav.querySelectorAll('.scroll-link');

// Add a click event listener to the scroll links
scrollLinks.forEach(function(scrollLink) {
  scrollLink.addEventListener('click', function(event) {
    // Prevent the default link behavior
    event.preventDefault();

    // Get the target element
    const target = event.target;

    // Get the href attribute of the link
    const href = target.getAttribute('href');

    // Get the element with the matching ID
    const element = document.querySelector(href);

    // Smoothly scroll to the element
    element.scrollIntoView({
      behavior: 'smooth'
    });
  });
});


const slideshow = document.getElementById('slideshow');
const images = slideshow.querySelectorAll('a');

images[0].classList.add('active');

let slideshowInterval = setInterval(function () {
  const activeImage = slideshow.querySelector('a.active');

  activeImage.classList.remove('active');

  if (activeImage.nextElementSibling) {
    activeImage.nextElementSibling.classList.add('active');
  } else {
    images[0].classList.add('active');
  }
}, 5000);