const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

//database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

//middlewares
app.use(
  cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(bodyParser.json());

//importing routes
const userRoutes = require('./Routes/User.route');
const postRoutes = require('./Routes/Post.route');


//using routes
app.use(userRoutes);
app.use(postRoutes);


//start an app
app.listen("5000", ()=>{
    console.log("working")
})