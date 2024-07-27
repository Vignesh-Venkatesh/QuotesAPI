const router = require("express").Router();
const { updateStatHitStatusCode } = require("../Middleware/queries");
const { getAllAuthors, getAuthorById } = require("./queries");

router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const statID = req.stat_id;
    const response = await getAllAuthors(page);
    await updateStatHitStatusCode(response.status, statID); // update the response status of the api hit
    res.status(response.status).json(response);
  } catch (error) {
    console.error("Error in route handler:", error.message || error);

    res.status(response.status).json(response);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const statID = req.stat_id;

    const response = await getAuthorById(id);

    await updateStatHitStatusCode(response.status, statID); // update the response status of the api hit

    res.status(response.status).json(response);
  } catch (error) {
    await updateStatHitStatusCode(response.status, statID); // update the response status of the api hit
    res.status(response.status).json(response);
  }
});

module.exports = router;
