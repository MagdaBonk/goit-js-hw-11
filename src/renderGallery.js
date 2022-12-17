export function renderGallery(imagesArray) {
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
