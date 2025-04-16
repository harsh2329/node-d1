const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
//express object..
const app = express()
app.use(cors()) // *
app.use(express.json()) //to accept data as json...


//import role routes
const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

//userRoutes
const userRoutes = require("./src/routes/UserRoutes")
app.use("/usr",userRoutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes) //
//http://localhost:3000/addState
//http://localhost:3000/state/addState

const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes) //http://localhost:3000/city/addCity

const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area",areaRoutes) //http://localhost:3000/area/add

const locationRoutes = require("./src/routes/LocationRoutes")
app.use("/location",locationRoutes) //http://localhost:3000/location/add

const offerRoutes = require("./src/routes/OfferRoutes")
app.use("/offer",offerRoutes) //http://localhost:3000/offer/alloffer 

const RlsRoutes = require("./src/routes/RlsRoutes")
app.use("/reslogsign" , RlsRoutes) 

const AdminRoutes = require("./src/routes/AdminRoutes")
app.use("/admin", AdminRoutes) //http://localhost:3000/admin/login

const CategoryRoutes = require("./src/routes/CategoryRoutes")
app.use("/category", CategoryRoutes) //http://localhost:3000/category/addCategory

mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})


//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})