const express = require("express");
// const { connectToMongoDB } = require("./connect.js");
const { connectToMongoDB } = require("./connect2");

const urlRoute = require("./routes/url")


const app = express();
const PORT = 8001;

app.use(express.json());    // use express.json() as middleware to fetch api

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => console.log("mongoDB connected"));

app.use("/url", urlRoute)

app.listen(PORT, () => console.log(`Server Started at Port:${PORT}`));