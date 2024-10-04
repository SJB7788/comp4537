const utils = require("./public/modules/utils");
const lang = require("./public/lang/en/en");
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const cors = require("cors")

app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/COMP4537/labs/3/getDate/", (req, res) => {
  const string = `<h1 style='color: blue'>${lang} ${utils.getDate()}</h1>`;
  res.send(string.replace("%1", req.query.name));
});

app.get("/COMP4537/labs/3/writeFile/", (req, res) => {
  const text = req.query.text;
  if (text) {
    fs.appendFile("./file/text.txt", text, (err) => {
      // In case of a error throw err.
      if (err) throw err;
      res.send("Success");
    });
    return;
  }
  res.send("Text is required");
});

app.get("/COMP4537/labs/3/readFile/", (req, res) => {
  const file = req.query.file;
  if (file) {
    fs.readFile(`./file/${file}`, (err, data) => {
      if (err) {
        res.sendStatus(404);
        return;
      }
      res.send(data.toString());
    });
    return;
  }
});


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
