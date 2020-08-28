import express from "express";

const app = express();
const port = 3000;

app.get("/", (require, response) => {
  response.send("hi there.");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});