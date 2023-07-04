require("./app/config/mongodb");
const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("", (request, response) => {
  response.send("Server is working Fine !!");
});

require("./app/routes/user.routes")(app);

app.use((request, response, next) => {
  const arr = {
    status: false,
    message: "Oops, Something went wrong !!",
  };
  response.status(404).send(arr);
});

app.listen(3000);
