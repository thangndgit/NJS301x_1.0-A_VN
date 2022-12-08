import { API_HOST, API_KEY, IMG_SRC } from "./api";

const REQUESTS = {
  fetchTrending: `${API_HOST}/trending?token=${API_KEY}`,
  fetchNetflixOriginals: `${API_HOST}/discover?token=${API_KEY}&genre=12`,
  fetchTopRated: `${API_HOST}/top-rate?token=${API_KEY}`,
  fetchActionMovies: `${API_HOST}/discover?token=${API_KEY}&genre=28`,
  fetchComedyMovies: `${API_HOST}/discover?token=${API_KEY}&genre=35`,
  fetchHorrorMovies: `${API_HOST}/discover?token=${API_KEY}&genre=27`,
  fetchRomanceMovies: `${API_HOST}/discover?token=${API_KEY}&genre=10749`,
  fetchDocumentaries: `${API_HOST}/discover?token=${API_KEY}&genre=99`,
  fetchSearch: `${API_HOST}/search?token=${API_KEY}`,
};

const urlToRequest = (url) => `${API_HOST}${url}token=${API_KEY}`;
const imgToRequest = (url, size) => IMG_SRC + size + url;

export default REQUESTS;
export { urlToRequest, imgToRequest };
