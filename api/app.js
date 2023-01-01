var createError = require("http-errors");
var express = require("express");
var multer = require("multer");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();


const mongoose = require("mongoose");
mongoose
    .connect(process.env.MONGODB_KEY)
    .then(() => {
        console.log("Connected to DB");
    })
    .catch(
        (err) => console.log(err)
        );

var indexRouter = require("./routes/index");
var ManufacturerRouter = require("./routes/Manufacturer/Manufacturer");
var ManufacturerSMRouter = require("./routes/Manufacturer/ManufacturerSM");
var SellerRouter = require("./routes/Seller/Seller");
var ProductRouter = require("./routes/Product/Product");
var BuyerRouter = require("./routes/Buyer/Buyer");
var OrderRouter = require("./routes/Order/Order");

var app = express();
const cors = require("cors");
app.options(
    "*",
    cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 })
);
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/Manufacturer", ManufacturerRouter);
app.use("/ManufacturerSM", ManufacturerSMRouter);
app.use("/Seller", SellerRouter);
app.use("/Product",ProductRouter);
app.use("/Buyer",BuyerRouter);
app.use("/Order", OrderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
