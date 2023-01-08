const path = require("path");
const fs = require("fs");

const Genre = {
  all: function () {
    return JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "data", "genreList.json"),
        "utf8"
      )
    );
  },
};

module.exports = Genre;
