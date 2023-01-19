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
