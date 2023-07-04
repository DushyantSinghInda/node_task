module.exports = (app) => {
  const user = require("../controllers/user.controller");
  var router = require("express").Router();

  router.get("/login", user.login);
  router.post("/register", user.register);
  router.put("/find/:email", user.changePassword);

  app.use("/user", router);
};
