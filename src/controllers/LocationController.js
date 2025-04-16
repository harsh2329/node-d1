const LocationModel = require('../models/LocationModel');

const cloudinaryUtil = require('../utils/cloudinaryUtil');
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
      const Locations = await LocationModel.find().populate(["stateId", "cityId", "areaId"]);
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

const getAllLocationByUserId = async (req,res)=>{
    try{
        const Locations = await LocationModel.find({userId:req.params.userId}).populate(["stateId", "cityId", "areaId", "userId"]);
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

// const addLocationWithFile = async (req, res) => {
//   try {
//     // Assuming 'XMLHttpRequestUpload' is a middleware-like function
//     await XMLHttpRequestUpload(req, res);
//     res.status(200).json({
//       message: "File uploaded and location added successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// };
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' }).single('file'); // Adjust configuration as needed

// const addLocationWithFile = async (req, res) => {
//   // Using the same multer upload middleware as in user controller
//   upload(req, res, async (err) => {
//       if(err){
//           res.status(500).json({
//               message: err.message
//           });
//       } else {
//           try {
//               // Process the request body data if needed
//               console.log(req.body);
              
//               // Upload file to Cloudinary if a file exists
//               if(req.file) {
//                   const cloudinaryResponse = await cloudinaryUtil.uploadFilToCloudinary(req.file);
//                   console.log(cloudinaryResponse);
                  
//                   // Add the Cloudinary URL to the request body
//                   req.body.imagePath = cloudinaryResponse.secure_url;
//               }
              
//               // Create location in database - CHANGE TO LocationModel (uppercase L)
//               const createdLocation = await LocationModel.create(req.body);
              
//               res.status(201).json({
//                   message: "Location created successfully",
//                   data: createdLocation
//               });
//           } catch (err) {
//               console.log(err);
//               res.status(500).json({
//                   message: "Error adding location",
//                   data: err.message
//               });
//           }
//       }
//   });
// };

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single('file'); // Define this at the top level

// const addLocationWithFile = async (req, res) => {
//   // Use upload as middleware outside the route handler
//   upload(req, res, async (err) => {
//     if(err) {
//       return res.status(500).json({
//         message: err.message
//       });
//     }
    
//     try {
//       console.log(req.body);
//       console.log("Cloudinary upload response:", cloudinaryResponse);
// console.log("Image path being saved:", req.body.imagePath);
      
//       // Check for required fields
//       const requiredFields = [
//         'title', 'category', 'description', 'timmings', 
//         'active', 'contactNumber', 'address', 'stateId', 
//         'userId', 'foodtype', 'latitude', 'longtitude'
//       ];
      
//       const missingFields = [];
      
//       requiredFields.forEach(field => {
//         if (req.body[field] === undefined) {
//           missingFields.push(field);
//         }
//       });
      
//       if (missingFields.length > 0) {
//         return res.status(400).json({
//           message: `Missing required fields: ${missingFields.join(', ')}`
//         });
//       }
      
//       // Upload file to Cloudinary if a file exists
//       if(req.file) {
//         const cloudinaryResponse = await cloudinaryUtil.uploadFilToCloudinary(req.file);
//         console.log(cloudinaryResponse);
        
//         // Add the Cloudinary URL to the request body
//         req.body.imagePath = cloudinaryResponse.secure_url;
//       }
      
//       // Create location in database
//       const createdLocation = await LocationModel.create(req.body);
      
//       res.status(201).json({
//         message: "Location created successfully",
//         data: createdLocation
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         message: "Error adding location",
//         data: err.message
//       });
//     }
//   });
// };

const addLocationWithFile = async (req, res) => {
    // Use upload as middleware outside the route handler
    upload(req, res, async (err) => {
      if(err) {
        return res.status(500).json({
          message: err.message
        });
      }
      
      try {
        console.log(req.body);
        
        // Check for required fields
        const requiredFields = [
          'title', 'category', 'description', 'timmings', 
          'active', 'contactNumber', 'address', 'stateId',
          'userId', 'foodtype', 'latitude', 'longtitude'
        ];
        
        const missingFields = [];
        
        requiredFields.forEach(field => {
          if (req.body[field] === undefined) {
            missingFields.push(field);
          }
        });
        
        if (missingFields.length > 0) {
          return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(', ')}`
          });
        }
        
        // Upload file to Cloudinary if a file exists
        if(req.file) {
          const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
          console.log("Cloudinary upload response:", cloudinaryResponse);
          
          // Add the Cloudinary URL to the request body
          req.body.imagePath = cloudinaryResponse.secure_url;
          console.log("Image path being saved:", req.body.imagePath);
        }
        
        // Create location in database
        const createdLocation = await LocationModel.create(req.body);
        
        res.status(201).json({
          message: "Location created successfully",
          data: createdLocation
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Error adding location",
          data: err.message
        });
      }
    });
  };

module.exports = {
    addLocations,
    getAllLocations,
    getAllLocationByUserId,
    addLocationWithFile
};