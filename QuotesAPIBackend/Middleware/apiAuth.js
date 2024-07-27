const { validateAPIkey } = require("./queries");

const authMiddleware = async (req, res, next) => {
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
    const apiKeyExists = await validateAPIkey(apiKey);

    if (apiKeyExists.status === 200) {
      return next();
    } else {
      return res.status(401).json({ message: "Invalid API key", status: 401 });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: 500 });
  }
};

module.exports = authMiddleware;
