const express = require('express');
const mongosse = require("mongoose")
const app = express();
const userRoutes = require('./routes/UserRoutes');
const cors = require("cors")

// ...existing code...
app.use(cors())
app.use(express.json());
// app.use('/user', userRoutes);

const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)
const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)
// ...existing code...
mongosse.connect("mongodb://127.0.0.1/25_node_internship").then(()=>{
    console.log("database connected...");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
