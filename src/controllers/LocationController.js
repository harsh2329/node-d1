const LocationModel = require('../models/LocationModel');

const addLocations = async (req, res )  =>{
    try {
    const savedLocations = await LocationModel.create(req.body);
    res.status(201).json({
        message:"Restaurant added sucessfully " ,
        data:savedLocations,
    })
    }catch (err){
     res.status(500).json({
        message:err.message
     });
    }
}

const getAllLocations = async(req,res)=>{
    try{
  const Locations = await LocationModel.find().populate(" stateId cityId areaId ");
  if (Locations.length === 0){
    res.status(404).json({
      message:"No Locations found"
    });
  }else {
    res.status(200).json({
        message:"All Locations fetched successfully",
        data:Locations,
    })
  }
    }catch(err){
        res.status(500).json({
            message:err.message
    });
}

}

module.exports = { addLocations , getAllLocations };