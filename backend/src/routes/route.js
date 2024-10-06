const express = require("express");
const routes = express.Router();
const userRoute = require("./user.route");
const eventRoute = require("./event.route");

routes.use("/user", userRoute);
routes.use("/event", eventRoute);

module.exports = routes;
