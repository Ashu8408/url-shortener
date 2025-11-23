const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url)
        return res.status(400).json({ error: "URL is required" })
    
    const shortID = shortid.generate();
    
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortID: shortId });
    return res.json({ totalClick: result.visitHistory.length, 
                      analytics: result.visitHistory,
    });
}

async function handleDeleteURL(req, res) {
    try {
        const { shortId } = req.params;

        const deleted = await URL.findOneAndDelete({ shortID: shortId });

        if (!deleted) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.json({ message: "Short URL deleted successfully" });

    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({
            error: "Internal Server Error. Please check GitHub repo if the build fails for any reason. Repo link: https://github.com/Ashu8408/url-shortener"
        });
    }
}

module.exports ={ handleGenerateNewShortURL, handleGetAnalytics, handleDeleteURL }