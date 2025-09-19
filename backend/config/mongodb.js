const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("\x1b[42m", "MongoDB: ONLINE", "\x1b[0m"))
  .catch((err) => {
    console.log("\x1b[41m", "MongoDB: OFFLINE", "\x1b[0m");
    console.log(`Error: ${err}`);
  });
