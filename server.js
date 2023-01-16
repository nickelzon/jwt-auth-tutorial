require("dotenv").config();
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

// console.log(process.env);

const posts = [
  {
    name: "Albert",
  },
];

//body parser for json
app.use(express.json());

//auth middleware
const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

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

app.post("/login", (request, response) => {
  const username = request.body.username;
  const user = {
    name: username,
  };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  response.json({ accessToken: accessToken });
});

app.listen(4000, () => console.log("server up running on PORT 4000..."));
