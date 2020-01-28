import ky from "ky-universal";
import cheerio from "cheerio";

async function checkForPozole() {
  const document = await ky("https://laughingplanet.com").text();
  const $ = cheerio.load(document);
  const special = $(
    "body > div.scheme-cream-dark > div > div > main > div.col-md-6.specials > div.col-md-7 > h3"
  ).text();
  return special.toLowerCase().includes("pozole");
}

export default async function(req, res) {
  try {
    const hasPozole = await checkForPozole();
    res.status(200);
    res.json({ hasPozole });
  } catch (error) {
    res.status(500);
    res.error("Something went wrong while checking for Pozole");
  }
}
