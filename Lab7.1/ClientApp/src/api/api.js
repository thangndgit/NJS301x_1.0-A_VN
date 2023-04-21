const host = "http://localhost:5000/api";

const api = {};

api.product = {
  getAll: () => host + "/products",
  create: () => host + "/products",
};

export const call = (url = host, apply = () => {}, options = {}) => {
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => apply(data))
    .catch((err) => console.log(err));
};

export default api;
