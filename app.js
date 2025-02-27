const express = require("express") //express....
const mongoose = require("mongoose")
//express object..
const app = express()
app.use(express.json)

//import role routes

const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

const UserRoutes = require("./src/routes/UserRoutes")
app.use('/api', UserRoutes)



mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})


//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})

module.exports = app;