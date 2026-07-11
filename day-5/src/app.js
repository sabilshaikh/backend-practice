const express = require("express")

const app = express();

app.use(express.json())

const authRouter = require("../src/routes/auth.routes");
const cookieParser = require("cookie-parser");

app.use("/api/auth",authRouter)

app.use(cookieParser())


module.exports = app