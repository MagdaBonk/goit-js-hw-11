import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import _debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const API_KEY = '32105928-babf9526dde61d2d51f562299';

const searchForm = document.querySelector('form#search-form');
const inputSearch = document.querySelector("input[name='searchQuery']");
const gallery = document.querySelector('.gallery');
const topButton = document.querySelector('.top');

searchForm.addEventListener('input', _debounce(inputListener, DEBOUNCE_DELAY));

inputSearch.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
});

async function inputListener(event) {
  gallery.innerHTML = '';
  const searchQuery = event.target.value;
  const imageList = await getImages(searchQuery, 1, API_KEY);

  if (!searchQuery) {
    gallery.innerHTML = '';
  } else if (imageList.hits.length == 0) {
    Notiflix.Notify.info(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  } else {
    gallery.insertAdjacentHTML('afterbegin', renderGallery(imageList.hits));

    const gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

async function getImages(query, pageNumber, API_KEY) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: `${API_KEY}`,
        q: `${query}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: pageNumber,
        per_page: 40,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function renderGallery(imagesArray) {
  return imagesArray
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `</a>
      <div class="gallery__items">
        <figure>
        <a class="gallery__item" href=${largeImageURL}>
      <img class="gallery__image" src=${webformatURL} alt=${tags}" loading="lazy" />
      </a>
      <figcaption class="info">
      <p class="info-item">
      <b>Likes</b> ${likes}
      </p>
      <p class="info-item">
      <b>Views</b> ${views}
      </p>
      <p class="info-item">
      <b>Comments</b> ${comments}
      </p>
      <p class="info-item">
      <b>Downloads</b> ${downloads}
      </p>
      </figcaption>
      </figure>
      </div>`
    )
    .join('');
}

const goTop = event => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

topButton.addEventListener('click', goTop);

window.onscroll = () => {
  backToTop();
};

function backToTop() {
  if (
    document.body.scrollTop > 150 ||
    document.documentElement.scrollTop > 150
  ) {
    topButton.style.display = 'block';
  } else {
    topButton.style.display = 'none';
  }
}
