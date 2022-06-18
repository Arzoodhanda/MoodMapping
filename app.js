require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const db = require('./src/backend/Database/databaseConnect')
const routes = require('./src/backend/routes')

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT;

require('./src/backend/passport-config')(passport);

app.set("views", __dirname + "/src/client/views");
app.use(express.static(__dirname + "/src/client"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(session({
  resave: false,
  secret: process.env.ACCESS_TOKEN_SECRET,
  saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());


// Connect to DataBase
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo Connected...'))
  .catch((err) => {
    console.log('Error', err)
  })

app.use((req, res, next) => { // color code the message t
  res.locals.error = req.flash('error')
  next();
})

app.use('/', routes)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
