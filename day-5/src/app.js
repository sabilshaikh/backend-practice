const express = require("express")

const app = express();

app.use(express.json())

const authRouter = require("../src/routes/auth.routes");
const postRouter = require("../src/routes/post.routes")
const followRouter = require("./routes/follow.routes")
const cookieParser = require("cookie-parser");

app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/post",postRouter)
app.use("/api/user",followRouter)
app.use("/api/user",followRouter)




module.exports = app