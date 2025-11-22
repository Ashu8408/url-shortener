const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(request, response) {
    const body = req.body;
    if(!body.url)
        return res.status(400).json({ error:"URL is required" })
    
    const shortID = shortID();
    
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortID });
}

module.exports ={ handleGenerateNewShortURL }