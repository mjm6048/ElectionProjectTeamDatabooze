const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const port = 5000;
const bl = require("./businesslayer");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.post("/users/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    check = await bl.userExists(username, password);
    console.log(check);
    if (check) {
      res.status(200).json("Login successful");
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
});

app.get("/users/society-statistics", async (req, res) => {
  const societyID = parseInt(req.query.societyID);

  try {
    console.log(societyID);
    const report = await bl.generateSocietyStatistics(societyID);
    console.log("in api");
    res.status(200).json(report);
  } catch (error) {
    console.error("Error generating society statistics report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users/system-statistics", async (req, res) => {
  try {
    const report = await bl.getSystemStatistics();
    res.status(200).json(report);
  } catch (error) {
    console.error("Error generating system statistics report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log("port connected");
});
