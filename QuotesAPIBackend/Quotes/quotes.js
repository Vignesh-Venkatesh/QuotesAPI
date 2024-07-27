const router = require("express").Router();
const { updateStatHitStatusCode } = require("../Middleware/queries");
const { getAllQuotes, getRandomQuote, getQuoteById } = require("./queries");

router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const statID = req.stat_id;

    const response = await getAllQuotes(page);

    await updateStatHitStatusCode(response.status, statID); // update the response status of the api hit

    res.status(response.status).json(response);
  } catch (error) {
    await updateStatHitStatusCode(response.status, statID); // update the response status of the api hit

    res.status(response.status).json(response);
  }
});

router.get("/random", async (req, res) => {
  try {
    const statID = req.stat_id;
    const response = await getRandomQuote();
    await updateStatHitStatusCode(response.status, statID); // update the response status of the api hit
    res.status(response.status).json(response);
  } catch (error) {
    await updateStatHitStatusCode(response.status, statID); // update the response status of the api hit
    res.status(response.status).json(response);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const statID = req.stat_id;

    const response = await getQuoteById(id);
    await updateStatHitStatusCode(response.status, statID); // update the response status of the api hit
    res.status(response.status).json(response);
  } catch (error) {
    await updateStatHitStatusCode(response.status, statID); // update the response status of the api hit
    res.status(response.status).json(response);
  }
});

module.exports = router;
