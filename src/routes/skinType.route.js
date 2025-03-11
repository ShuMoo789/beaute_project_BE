const express = require('express');
const skinTypeController = require('../controllers/skinType.controller');

const skinTypeRouter = express.Router();

// CRUD routes for skin types
skinTypeRouter.post('/', skinTypeController.createSkinType);
skinTypeRouter.get('/', skinTypeController.getAllSkinTypes);
skinTypeRouter.get('/:id', skinTypeController.getSkinTypeById);
skinTypeRouter.put('/:id', skinTypeController.updateSkinType);
skinTypeRouter.delete('/:id', skinTypeController.deleteSkinType);

// Add/Remove routines to/from skin types
skinTypeRouter.post('/skin-analysis', skinTypeController.updateUserSkinType);
skinTypeRouter.post('/:skinTypeId/routines/:routineId', skinTypeController.addRoutineToSkinType);
skinTypeRouter.delete('/:skinTypeId/routines/:routineId', skinTypeController.removeRoutineFromSkinType);

module.exports = skinTypeRouter;
