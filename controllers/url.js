import { nanoid } from "nanoid";
import URL from "../models/url.js";

export const homepage = async function (req, res) {
  const allUrls = await URL.find({});
  const PORT = process.env.PORT || 8000;
  res.render("home.ejs", {
    urls: allUrls,
    port: PORT,
  });
};

// export async function handleGenerateNewShortUrl(req, res) {
//   const body = req.body;
//   if (!body.url) {
//     return res.status(400).json({ error: "URL is Required!" });
//   }

//   const shortid = nanoid(8);
//   await URL.create({
//     shortId: shortid,
//     redirectUrl: body.url,
//     visitHistory: [],
//   });

//   return res.render("home", { id: shortid });
//   //   return res.json({ id: shortid });
// }
export async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;

  // Check if URL is provided
  if (!body.url) {
    return res.status(400).json({ error: "URL is required!" });
  }

  // Generate a short ID for the URL
  const shortid = nanoid(8);

  // Create a new URL document and save it
  const newUrl = new URL({
    shortId: shortid,
    redirectUrl: body.url,
    visitHistory: [], // Initialize with an empty visit history
  });

  try {
    // Save the URL to the database
    await newUrl.save();

    // Return the short URL ID as the response
    return res.redirect("/");
  } catch (error) {
    console.error("Error saving new URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// export async function handleRedirectShortId(req, res) {
//   const id = req.params.shortid;

//   const entry = await URL.findOneAndUpdate(
//     {
//       id,
//     },
//     {
//       $push: {
//         visitHistory: { timestamps: Date.now() },
//       },
//     }
//   );
//   res.redirect(entry.redirectUrl);
// }
export async function handleRedirectShortId(req, res) {
  const shortId = req.params.shortId;

  try {
    // Find the URL document by the shortId and update the visit history
    const entry = await URL.findOneAndUpdate(
      { shortId }, // Match by shortId
      {
        $push: { visitHistory: { timestamp: Date.now() } }, // Push the new visit to visitHistory
      },
      { new: true } // Return the updated document
    );

    // Check if the entry exists
    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Redirect to the original URL
    return res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error redirecting URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleGetAnalytics(req, res) {
  const id = req.params.shortId;
  const result = await URL.findOne({ shortId: id });

  //   return res.json({
  //     totalClicks: result.visitHistory.length,
  //     analytics: result.visitHistory,
  //   });

  return res.redirect("/");
}
