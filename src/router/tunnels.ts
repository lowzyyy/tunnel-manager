import express from "express";
import { extractAuthToken, processError } from "../helpers/globalHelpers.js";
import { APIs } from "../app.js";
import dotenv from "dotenv";
dotenv.config();

export const tunnelRouter = express.Router();

tunnelRouter.post("/setApi", (req, res) => {
  const { tunnelInfo } = req.body;
  const token = extractAuthToken(req.headers.authorization);

  try {
    if (!tunnelInfo || !tunnelInfo.name || !tunnelInfo.url)
      throw { message: "Invalid reqest data!", code: 400 };

    if (token !== process.env.API_KEY)
      throw { message: "Not authorized!", code: 401 };

    APIs.set(tunnelInfo.name, tunnelInfo.url);

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    processError(error, res);
  }
});

tunnelRouter.get("/getApi", (req, res) => {
  const { term } = req.query;
  const token = extractAuthToken(req.headers.authorization);
  try {
    if (token !== process.env.API_KEY)
      throw { message: "Not authorized!", code: 401 };

    if (!APIs.get(term)) throw { message: "Api does not exist!", code: 404 };

    return res.status(200).json({ data: { url: APIs.get(term) } });
  } catch (error) {
    processError(error, res, null);
  }
});
