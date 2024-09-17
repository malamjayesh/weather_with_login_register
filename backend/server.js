require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const authroute = require("./routes/user.route")
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/jayeshmalam")
.then(()=>{
    console.log("connected to mongodb databse");
})
.catch((error)=>{
    console.log(error);
})

app.use("/api/auth",authroute)
const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`server started at port num:${PORT}`);
})