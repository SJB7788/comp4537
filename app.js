const http = require("http");
const fs = require("fs");
const url = require("url");
const lang = require("./public/lang/en/en");
const utils = require("./public/modules/utils");

class httpServer {
  constructor() {
    this.server = http.createServer(this.runningServer.bind(this));
  }

  runningServer(req, res) {
    if (req.url === "/") {
      res.end("Hello this is main page wassup");
    } 
    
    else if (req.url.startsWith("/COMP4537/labs/3/getDate")) {
      const addr = url.parse(req.url, true);
      const query = addr.query;
  
      let responseString = `<h1 style='color: blue'>${lang.dayString} ${utils.getDate()}</h1>`;
      responseString = responseString.replace("%1", query.name);
  
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(responseString);
    } 
    
    else if (req.url.startsWith("/COMP4537/labs/3/writeFile")) {
      const addr = url.parse(req.url, true);
      const query = addr.query;
      const text = query.text;
  
      if (text) {
        fs.appendFile("./file/text.txt", text, (err) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.end(lang.errorMessage);
            return;
          };
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(lang.successMessage);
        });
        return;
      }
      res.end(lang.textRequired);
    } 
    
    else if (req.url.startsWith("/COMP4537/labs/3/readFile")) {
      const addr = url.parse(req.url, true);
      const query = addr.query;
      const file = query.file;
  
      if (file) {
        fs.readFile(`./file/${file}`, (err, data) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.end(lang.errorMessage);
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(data.toString());
        });
        return;
      }
    } 
    
    else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(lang["404Message"]);
    }
  }
  
  listen() {
    server.listen(8080, () => {
      console.log(lang.serverListening);
    });
  }
}
