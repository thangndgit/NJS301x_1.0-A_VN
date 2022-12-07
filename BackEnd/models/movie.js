const path = require("path");
const fs = require("fs");

const Movie = {
  all: function () {
    return JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "data", "movieList.json"),
        "utf8"
      )
    );
  },
};

module.exports = Movie;
