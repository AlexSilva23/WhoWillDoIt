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
