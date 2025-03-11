const SkinType = require("../models/skinType.model");
const Routine = require("../models/routine.model");
const User = require("../models/user.model");

/**
 * Create a new skin type.
 * @param {Object} data - Skin type data to be created
 * @returns {Promise<Object>} - Created skin type
 */
const createSkinType = async (data) => {
  try {
    return await SkinType.create(data);
  } catch (error) {
    console.log(error);
    throw {
      status: 500,
      message: "Failed to create skin type",
      error: error.message,
    };
  }
};

/**
 * Get all skin types.
 * @returns {Promise<Array>} - List of skin types with routines populated
 */
const getAllSkinTypes = async () => {
  try {
    return await SkinType.find().populate("routines");
  } catch (error) {
    throw {
      status: 500,
      message: "Failed to retrieve skin types",
      error: error.message,
    };
  }
};

/**
 * Get a single skin type by ID.
 * @param {String} id - Skin type ID
 * @returns {Promise<Object>} - Skin type with routines populated
 */
const getSkinTypeById = async (id) => {
  try {
    const skinType = await SkinType.findById(id).populate("routines");
    if (!skinType) throw { status: 404, message: "Skin type not found" };
    return skinType;
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Failed to retrieve skin type",
    };
  }
};

/**
 * Update a skin type.
 * @param {String} id - Skin type ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} - Updated skin type
 */
const updateSkinType = async (id, updateData) => {
  try {
    const updatedSkinType = await SkinType.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedSkinType) throw { status: 404, message: "Skin type not found" };
    return updatedSkinType;
  } catch (error) {
    throw {
      status: 500,
      message: "Failed to update skin type",
      error: error.message,
    };
  }
};

/**
 * Delete a skin type.
 * @param {String} id - Skin type ID
 * @returns {Promise<Object>} - Deleted skin type
 */
const deleteSkinType = async (id) => {
  try {
    const deletedSkinType = await SkinType.findByIdAndDelete(id);
    if (!deletedSkinType) throw { status: 404, message: "Skin type not found" };
    return deletedSkinType;
  } catch (error) {
    throw {
      status: 500,
      message: "Failed to delete skin type",
      error: error.message,
    };
  }
};

/**
 * Add a routine to a skin type.
 * @param {String} skinType - Skin type ID
 * @param {String} routineId - Routine ID
 * @returns {Promise<Object>} - Updated skin type with routines
 */
const addRoutineToSkinType = async (skinType, routineId) => {
  try {
    const routine = await Routine.findById(routineId);
    if (!routine) throw { status: 404, message: "Routine not found" };

    const skinType = await SkinType.findByIdAndUpdate(
      skinType,
      { $addToSet: { routines: routineId } }, // Prevent duplicates
      { new: true }
    ).populate("routines");

    return skinType;
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Failed to add routine to skin type",
    };
  }
};

/**
 * Remove a routine from a skin type.
 * @param {String} skinType - Skin type ID
 * @param {String} routineId - Routine ID
 * @returns {Promise<Object>} - Updated skin type with routines
 */
const removeRoutineFromSkinType = async (skinType, routineId) => {
  try {
    const skinType = await SkinType.findByIdAndUpdate(
      skinType,
      { $pull: { routines: routineId } }, // Remove from array
      { new: true }
    ).populate("routines");

    return skinType;
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Failed to remove routine from skin type",
    };
  }
};

/**
 * Update a user's skin type based on points.
 * @param {String} userId - User ID
 * @param {Number} points - Points for skin analysis
 * @returns {Promise<Object>} - Updated user with new skin type
 */
const updateUserSkinType = async (userId, points) => {
  try {
    // Find the skin type that matches the user's points
    const skinType = await SkinType.findOne({
      pointMin: { $lte: points }, // Points should be greater than or equal to pointMin
      pointMax: { $gte: points }, // Points should be less than or equal to pointMax
    });

    if (!skinType) throw { status: 404, message: "No matching skin type found for the given points" };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { skinType: skinType._id }, // Update the skinType field with the found skin type ID
      { new: true } // Return the updated user
    ).populate("skinType"); // Optionally populate the skinType field

    if (!updatedUser) throw { status: 404, message: "User not found" };
    return updatedUser;
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Failed to update user skin type",
    };
  }
};

/**
 * Get skin types by type.
 * @param {String} type - The type of skin to search for (e.g., "Oily", "Combination", "Dry")
 * @returns {Promise<Array>} - List of skin types matching the specified type
 */
const getSkinTypeByType = async (type) => {
  try {
    const skinTypes = await SkinType.find({ type }); // Assuming 'type' is the field in the SkinType model
    if (!skinTypes.length) throw { status: 404, message: "No skin types found for the specified type" };
    return skinTypes;
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Failed to retrieve skin types by type",
    };
  }
};

module.exports = {
  createSkinType,
  getAllSkinTypes,
  getSkinTypeById,
  updateSkinType,
  deleteSkinType,
  addRoutineToSkinType,
  removeRoutineFromSkinType,
  updateUserSkinType,
  getSkinTypeByType,
};
