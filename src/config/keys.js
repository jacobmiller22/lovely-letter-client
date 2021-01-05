let keys = null;
if (process.env.NODE_ENV !== "production") {
  keys = require("./dev");
} else {
  // prod
  keys = require("./prod");
}

export default keys.keys;
