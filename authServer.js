require("dotenv").config();
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

//body parser for json
app.use(express.json());

//routes
app.post("/login", (request, response) => {
  const username = request.body.username;
  const user = {
    name: username,
  };
  const accessToken = generateAccessToken(user);
  response.json({ accessToken: accessToken });
});

const generateAccessToken = (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });

app.listen(4000, () => console.log("server up running on PORT 4000..."));
