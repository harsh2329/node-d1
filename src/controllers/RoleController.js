const roleModel = require("../models/RoleModel")
//roleModel == roles
const getAllRoles = async (req, res) => {
  //await....
  //select * from roleModel

  const roles = await roleModel.find() //[{}]

  res.json({
    message: "role fetched successfully",
    data:roles
  });
};

const addRole = async (req , res) =>{
  const savedRole = await roleModel.create(req.body)
   console.log("request body....", req.body);
   res.json({
    message: "role added successfully",
    data:savedRole
  });
}
const deleteRole = async(req, res) =>{
const deleteRole = await roleModel.findByIdAndDelete(req.params.id)
console.log(req.params.id)

}

const getRoleById = async (req,res) =>{
  const foundRole = await roleModel.findById(req.params.id)
}
module.exports = {
    getAllRoles,addRole ,deleteRole ,getRoleById
};