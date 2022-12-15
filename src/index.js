import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import _debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('form#search-form');
const inputSearch = document.querySelector("input[name='searchQuery']");
const gallery = document.querySelector('div.gallery');

searchForm.addEventListener('input', _debounce(inputListener, DEBOUNCE_DELAY));

function inputListener(event) {
  const searchQuery = event.target.value;
  var URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
  const imageList = getImages(URL);
}

var API_KEY = '32105928-babf9526dde61d2d51f562299';

async function getImages(URL) {
  try {
    const response = await axios.get(URL);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

// const createGallery = imageList.hits
//   .map(
//     ({ previewURL, pageURL, tags }) =>
//       `<a class="gallery__item" href=${pageURL}>
//       <img class="gallery__image" src=${previewURL} alt=${tags}>
//     </a>`
//   )
//   .join('');

// gallery.insertAdjacentHTML('afterbegin', createGallery);

// const gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });
