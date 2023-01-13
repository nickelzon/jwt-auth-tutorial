require("dotenv").config();
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

console.log(process.env.ACCESS_TOKEN_SECRET);
console.log(process.env.REFRESH_TOKEN_SECRET);

//body parser for json
app.use(express.json());

//routes
app.post("/login", (request, response) => {
  const username = request.body.username;
  const user = {
    name: username,
  };
  const accessToken = generateToken(user);
  const refreshToken = generateRefreshToken(user);
  response.json({ accessToken: accessToken, refreshToken: refreshToken });
});

const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s" });
}; //with expiration

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};

app.listen(4000, () => console.log("server up running on PORT 4000..."));
