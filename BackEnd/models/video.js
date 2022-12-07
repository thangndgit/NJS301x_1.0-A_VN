const path = require("path");
const fs = require("fs");

const Video = {
  all: function () {
    return JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "data", "videoList.json"),
        "utf8"
      )
    );
  },
};

module.exports = Video;
