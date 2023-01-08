const path = require("path");
const fs = require("fs");

const User = {
  all: function () {
    return JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "data", "userToken.json"),
        "utf8"
      )
    );
  },
};

module.exports = User;
