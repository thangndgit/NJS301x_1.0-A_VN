const host = "http://localhost:5000/api";

const api = {};

api.users = {
  getAll: () => host + "/users",
  create: () => host + "/users",
};

export const call = (url = host, apply = () => {}, options = {}) => {
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => apply(data))
    .catch((err) => console.log(err));
};

export default api;
