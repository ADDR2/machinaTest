const app = require("express")();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const lodash = require("lodash");
const ovenMachine = require("./stateMachine")([
    { from: "boot", to: "off" },
    { from: "boot", to: "faulted" },
    { from: "off", to: "idle" },
    { from: "idle", to: "pre-heat" },
    { from: "pre-heat", to: "load" },
    { from: "load", to: "loaded" },
    { from: "loaded", to: "cooking" }
]);

/* Post from evironment variables or 3000 by default */
const port = process.env.PORT || 3000;

/* Body parser to read json */
app.use(bodyParser.json());

/* Logger */
app.use(morgan('dev', {
  skip: (req, res) => res.statusCode < 400,
  stream: process.stdout
}));

app.use(morgan('dev', {
  skip: (req, res) => res.statusCode >= 400,
  stream: process.stderr
}));

/* Define routes */
app.use("/rack/v1", () => {});

/* Listen on given port */
app.listen(port, () => {
  console.log(`Server up in port ${port}`);
});

module.exports = {
  app
};