const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");
const app = express();
const port = 3030;
const baseUrl =
  "http://ec2-34-243-153-154.eu-west-1.compute.amazonaws.com:5000";

app.use(express.static(path.resolve(__dirname, "client", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use(bodyParser.json());

app.get("/api/cakes", (req, res) => {
  axios(`${baseUrl}/api/cakes`).then(response => res.send(response.data));
});

app.get("/api/cakes/:id", (req, res) => {
  axios(`${baseUrl}/api/cakes/${req.params.id}`).then(response =>
    res.send(response.data)
  );
});

app.post("/api/cakes", (req, res) => {
  axios
    .post(`${baseUrl}/api/cakes`, req.body)
    .then(response => {
      res.status = response.status;
      res.send();
    })
    .catch(err => {
      throw err;
    });
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
