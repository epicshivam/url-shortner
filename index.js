import express, { urlencoded } from "express";
import { connectToMongoDb } from "./connect.js";
import url from "./routes/url.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the folder where EJS templates are stored
app.set("views", "./views");

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", url);
// app.use("/url", handleGenerateNewShortUrl);

//MongoDb connection
connectToMongoDb("mongodb://localhost:27017/url-shortner").then(() => {
  console.log("MongoDb is connected!");
});

//server starting point
app.listen(PORT, () => {
  console.log("Server is running beautifully");
});
