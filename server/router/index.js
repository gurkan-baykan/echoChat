import express from "express";
import { saveMessage, getMessages } from "../controller/index.js";

const router = express.Router();

router.post("/sendMessage", (req, res) => {
  saveMessage(req.body)
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((e) => {
      res.send({ error: e });
    });
});

router.get("/getMessages", (req, res) => {
  getMessages(req.query.skip)
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((e) => {
      res.send({ error: e });
    });
});

export default router;
