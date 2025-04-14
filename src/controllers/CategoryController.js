// const CategroyModel = require("../models/CategroyModel");

// //addCategory
// const addCategory = async (req, res) => {
//   try {
//     const savedCategory = await categoryModel.create(req.body);
//     res.status(201).json({
//       message: "Category added successfully",
//       data: savedCategory,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err,
//     });
//   }
// };

// //getAllCategories
// const getAllCategories = async (req, res) => {
//     try {
//         const categories = await categoryModel.find();
//         res.status(200).json({
//             message: "All categories fetched successfully",
//             data: categories
//         })
//     } catch(err) {
//         res.status(500).json({
//             message: err
//         })
//     }
// }

// module.exports = {
//     addCategory,
//     getAllCategories,
// }

const CategoryModel = require("../models/CategroyModel");

//addCategory
const addCategory = async (req, res) => {
  try {
    const savedCategory = await CategoryModel.create(req.body);
    res.status(201).json({
      message: "Category added successfully",
      data: savedCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message, // Changed to err.message for better error info
    });
  }
};

//getAllCategories
const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json({
            message: "All categories fetched successfully",
            data: categories
        })
    } catch(err) {
        res.status(500).json({
            message: err.message // Changed to err.message for better error info
        })
    }
}

module.exports = {
    addCategory,
    getAllCategories,
}