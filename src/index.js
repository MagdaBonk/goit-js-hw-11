import './css/styles.css';
import { getImages } from './getImages';
import { renderGallery } from './renderGallery';

import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import _debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

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

const gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function inputListener(event) {
  gallery.innerHTML = '';
  const searchQuery = event.target.value;
  const imageList = await getImages(searchQuery, 1);

  if (!searchQuery) {
    gallery.innerHTML = '';
  } else if (imageList.hits.length == 0) {
    Notiflix.Notify.info(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  } else {
    Notiflix.Notify.success(`Hooray! We found ${imageList.totalHits} images.`);
    gallery.insertAdjacentHTML('beforeend', renderGallery(imageList.hits));
    gallerySimpleLightbox.refresh();
  }
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
