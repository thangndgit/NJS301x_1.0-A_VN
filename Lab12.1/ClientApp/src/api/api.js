const host = "http://localhost:5000/api";

const api = {};

api.product = {
  getAll: () => host + "/products",
  create: () => host + "/products",
  getById: (id) => host + "/products/" + id,
  updateById: (id) => host + "/products/" + id,
  deleteById: (id) => host + "/products/" + id,
};

api.cart = {
  get: () => host + "/carts",
  update: () => host + "/carts",
};

api.order = {
  get: () => host + "/orders",
  create: () => host + "/orders",
};

export const call = (url = host, apply = (data) => {}, options = {}) => {
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => apply(data))
    .catch((err) => console.log(err));
};

export default api;
