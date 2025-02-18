const skinTypeService = require("../services/skinType.services");

/**
 * Create a new skin type.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const createSkinType = async (req, res) => {
  try {
    const skinType = await skinTypeService.createSkinType(req.body);
    res.status(201).json({ message: "Skin type created successfully", data: skinType });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Failed to create skin type" });
  }
};

/**
 * Get all skin types.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getAllSkinTypes = async (req, res) => {
  try {
    const skinTypes = await skinTypeService.getAllSkinTypes();
    res.status(200).json({ data: skinTypes });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Failed to retrieve skin types" });
  }
};

/**
 * Get a single skin type by ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getSkinTypeById = async (req, res) => {
  try {
    const skinType = await skinTypeService.getSkinTypeById(req.params.id);
    res.status(200).json({ data: skinType });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Failed to retrieve skin type" });
  }
};

/**
 * Update a skin type.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const updateSkinType = async (req, res) => {
  try {
    const updatedSkinType = await skinTypeService.updateSkinType(req.params.id, req.body);
    res.status(200).json({ message: "Skin type updated successfully", data: updatedSkinType });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Failed to update skin type" });
  }
};

/**
 * Delete a skin type.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const deleteSkinType = async (req, res) => {
  try {
    const deletedSkinType = await skinTypeService.deleteSkinType(req.params.id);
    res.status(200).json({ message: "Skin type deleted successfully", data: deletedSkinType });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Failed to delete skin type" });
  }
};

/**
 * Add a routine to a skin type.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const addRoutineToSkinType = async (req, res) => {
  try {
    const skinType = await skinTypeService.addRoutineToSkinType(req.params.skinTypeId, req.params.routineId);
    res.status(200).json({ message: "Routine added to skin type", data: skinType });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Failed to add routine to skin type" });
  }
};

/**
 * Remove a routine from a skin type.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const removeRoutineFromSkinType = async (req, res) => {
  try {
    const skinType = await skinTypeService.removeRoutineFromSkinType(req.params.skinTypeId, req.params.routineId);
    res.status(200).json({ message: "Routine removed from skin type", data: skinType });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Failed to remove routine from skin type" });
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
};
