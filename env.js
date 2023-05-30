const dotenv = require("dotenv");
const path = require("path");
if (process.env.NODE_ENV == "test") {
  dotenv.config({
    path: path.join(__dirname, ".env.testing"),
  });
} else {
  dotenv.config({
    path: path.join(__dirname, ".env"),
  });
}
