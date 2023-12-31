import express from "express";
import { startPort } from "./helpers/globalHelpers.js";
import { tunnelRouter } from "./router/tunnels.js";

const app = express();

export let APIs = new Map();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(tunnelRouter);

app.listen(process.env.PORT || startPort);
