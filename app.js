const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("js"));
app.use(express.static("css"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
