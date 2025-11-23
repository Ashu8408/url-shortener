const express = require("express");
const { connectToMongoDB } = require("./connect2");
const urlRoute = require("./routes/url")
const URL = require("./models/url")


const app = express();
const PORT = 8001;

app.use(express.json());    // use express.json() as middleware to fetch api

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => console.log("mongoDB connected"));

app.get("/", (req,res) => {
    res.render("server.ejs", { shortURL: null })
});

app.use("/url", urlRoute)

app.get("/healthz", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortID: shortId },
        {
            $push: {
                visitHistory: { timestamp: Date.now() }
            }
        },
        { new: true } // return updated doc
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at Port:${PORT}`));