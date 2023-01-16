require("dotenv").config();
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

// console.log(process.env);

//body parser for json
app.use(express.json());

//routes
app.post("/login", (request, response) => {
  const username = request.body.username;
  const user = {
    name: username,
  };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  response.json({ accessToken: accessToken });
});

app.listen(4000, () => console.log("server up running on PORT 4000..."));
