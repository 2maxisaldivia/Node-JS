const express = require("express");
const app = express();
const apiRouter = require("./routers/app.routers");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api", apiRouter);


module.exports = app;

