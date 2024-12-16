const express = require("express");
const fs = require("fs");
const stream = require("stream");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const r = fs.createReadStream(getRandomPath());
  const ps = new stream.PassThrough();
  stream.pipeline(r, ps, (err) => {
    if (err) {
      console.log(err); // No such file or any other kind of error
      return res.sendStatus(400);
    }
  });
  console.log("Sending Scholz");
  ps.pipe(res);
});

app.listen(port, () => {
  console.log("Listening : " + port);
});

function getRandomPath() {
  var idx = Math.floor(Math.random() * 26);
  console.log(idx);
  return `./${idx}.jpg`;
}
