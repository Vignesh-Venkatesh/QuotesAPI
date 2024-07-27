const { getUserIDfromAPIkey, addStatHit } = require("./queries");
const { generateTimestamp } = require("../utils/dateUtils");

const statHitMiddleWare = async (req, res, next) => {
  let apiKey = req.headers.authorization;

  if (!apiKey) {
    return res
      .status(401)
      .json({ message: "No API key provided", status: 401 });
  }

  apiKey = apiKey.split(" ");

  if (apiKey.length !== 2 || apiKey[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Invalid API key format", status: 401 });
  }

  apiKey = apiKey[1];

  try {
    const userIDexists = await getUserIDfromAPIkey(apiKey);

    if (userIDexists.status === 200) {
      const userID = Number(userIDexists.userID);
      const endpoint = req.originalUrl.split("?")[0];
      const method = req.method;
      const timestamp = generateTimestamp();

      const response = await addStatHit(userID, endpoint, method, timestamp);

      if (response.status === 201) {
        req.stat_id = response.stat_id;
        return next();
      } else {
        return res.status(response.status).json(response);
      }
    } else {
      return res.status(401).json({ message: "Invalid API key", status: 401 });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: 500 });
  }
};

module.exports = statHitMiddleWare;
