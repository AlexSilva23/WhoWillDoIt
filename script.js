// Get the nav element
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

// Get the slideshow element
const slideshow = document.getElementById('slideshow');

// Get the images in the slideshow
const images = slideshow.querySelectorAll('img');

// Set the first image to be active
images[0].classList.add('active');

// Set the interval for the slideshow
let slideshowInterval = setInterval(function() {
  // Get the active image
  const activeImage = slideshow.querySelector('img.active');

  // Remove the "active" class from the active image
  activeImage.classList.remove('active');

  // Check if the active image is the last image
  if (activeImage.nextElementSibling) {
    // If not, set the next image to be active
    activeImage.nextElementSibling.classList.add('active');
  } else {
    // If it is, set the first image to be active
    images[0].classList.add('active');
  }
}, 5000);

const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add('visible');
    }
  });
});