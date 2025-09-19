/*
npm i bcrypt consign cors express jwt-simple knex moment mongoose node-schedule node-schedule passport passport-jwt pg pm2
*/

require("dotenv").config();
const app = require("express")();
const consign = require("consign");
const mongoose = require("mongoose");

const db = require("./config/db");
require("./config/mongodb");

//* Dotenv
const PORT = process.env.PORT || 3000;

//* Config
app.db = db;
app.mongoose = mongoose;
consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api/validation.js")
  .then("./api")
  .then("./schedule")
  .then("./config/routes.js")
  .into(app);

app.listen(PORT, () => {
  console.log("┌─────────────────────────────┐");
  console.log("│ Server:\x1b[92m Online \x1b[0m             │");
  console.log(`│ Port: ${PORT}                  │`);
  console.log(`│ link: http://localhost:${PORT} │`);
  console.log("└─────────────────────────────┘");
});
