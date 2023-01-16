require("dotenv").config();
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

//body parser for json
app.use(express.json());

const posts = [
  {
    name: "Albert",
  },
];

//auth middleware
const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token);

  if (!token) return response.status(401).send();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return response.status(403).send();
    request.user = user;
    next();
  });
};

//routes
app.get("/posts", authenticateToken, (request, response) => {
  response.json(posts.filter((p) => p.name === request.user.name));
});

app.listen(5000, () => console.log("server up running on PORT 5000..."));
