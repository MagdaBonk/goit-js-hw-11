import axios from 'axios';
const API_KEY = '32105928-babf9526dde61d2d51f562299';

export async function getImages(query, pageNumber, perPage = 40) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: `${API_KEY}`,
        q: `${query}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: pageNumber,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
