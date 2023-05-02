const multer = require("multer");
const path = require("path");

const storage = (pathArr = ["data"]) => {
  const storagePath = path.join(...pathArr);
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, storagePath),
    filename: (req, file, cb) => {
      const name = file.fieldname + "-" + Date.now() + "-" + file.originalname;
      cb(null, name);
    },
  });

  return multer({ storage });
};

module.exports = storage;
