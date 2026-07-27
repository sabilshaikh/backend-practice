const express = require("express")
const cookie_parser = require("cookie-parser")



const app = express()
app.use(express.json());
app.use(cookie_parser())
const authRouter = require("../src/routes/auth.routes")


app.use("/api/auth",authRouter)



module.exports = app