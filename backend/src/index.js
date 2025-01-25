import express from "express";
import dotenv from "dotenv";
const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());

app.get("/", (request, response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
