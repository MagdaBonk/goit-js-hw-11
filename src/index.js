import './css/styles.css';
import { getImages } from './getImages';
import { renderGallery } from './renderGallery';

import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import _debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const imagesPerPage = 40;

let currentPage = 1;
let totalPages;

const searchForm = document.querySelector('form#search-form');
const inputSearch = document.querySelector("input[name='searchQuery']");
const gallery = document.querySelector('.gallery');
const topButton = document.querySelector('.top');
const loadMoreButton = document.querySelector('.load-more');

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
  currentPage = 1;
  loadMoreButtonVisible(false);
  const searchQuery = inputSearch.value;
  const imageList = await getImages(searchQuery, currentPage, imagesPerPage);

  if (!searchQuery) {
    gallery.innerHTML = '';
    loadMoreButtonVisible(false);
  } else if (imageList.hits.length == 0) {
    Notiflix.Notify.info(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    loadMoreButtonVisible(false);
  } else {
    Notiflix.Notify.success(`Hooray! We found ${imageList.totalHits} images.`);
    gallery.insertAdjacentHTML('beforeend', renderGallery(imageList.hits));
    gallerySimpleLightbox.refresh();
    totalPages = Math.ceil(imageList.totalHits / imagesPerPage);
    if (totalPages > currentPage) {
      loadMoreButtonVisible(true);
    }
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

const loadMore = async event => {
  event.preventDefault();
  loadMoreButtonVisible(false);
  const searchQuery = inputSearch.value;

  currentPage++;

  const imageList = await getImages(searchQuery, currentPage, imagesPerPage);

  totalPages = Math.ceil(imageList.totalHits / imagesPerPage);
  gallery.insertAdjacentHTML('beforeend', renderGallery(imageList.hits));
  gallerySimpleLightbox.refresh();

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2.5,
    behavior: 'smooth',
  });

  if (totalPages > currentPage) {
    loadMoreButtonVisible(true);
  } else {
    Notiflix.Notify.info(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  }
};

loadMoreButton.addEventListener('click', loadMore);

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

function loadMoreButtonVisible(visible) {
  if (visible) {
    loadMoreButton.classList.remove('is-hidden');
  } else {
    loadMoreButton.classList.add('is-hidden');
  }
}
