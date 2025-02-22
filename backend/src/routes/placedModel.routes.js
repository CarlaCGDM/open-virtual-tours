import express from "express";
import { 
  getPlacedModelById,
  getAllPlacedModels, 
  getPlacedModelsByIds, 
  createPlacedModel, 
  updatePlacedModel, 
  deletePlacedModel 
} from "../controllers/placedModel.controller.js";
// import { verifyToken } from "../middleware/authMiddleware.js"; // Uncomment when enabling JWT

const router = express.Router();

// Routes for all placed models
router.route("/")
  .get(getAllPlacedModels)      // Fetch all placed models
  .post(createPlacedModel);      // Create a new placed model

// Route for getting multiple placed models by IDs (expects query parameter)
router.get("/multiple", getPlacedModelsByIds);

// Routes for specific placed model by ID
router.route("/:placedModelId")
  .get(getPlacedModelById)      // Fetch one placed model by ID
  .put(updatePlacedModel)       // Update a placed model by ID
  .delete(deletePlacedModel);   // Delete a placed model by ID

// ✅ Uncomment this when enabling JWT
// router.route("/")
//   .get(verifyToken, getAllPlacedModels)
//   .post(verifyToken, createPlacedModel);

// router.get("/multiple", verifyToken, getPlacedModelsByIds); // ✅ Secured version

// router.route("/:placedModelId")
//   .get(verifyToken, getPlacedModelById)
//   .put(verifyToken, updatePlacedModel)
//   .delete(verifyToken, deletePlacedModel);

export default router;


// 📌 Example API Requests

// ✅ Single PlacedModel Request (GET /placedModels/:placedModelId)
// GET /placedModels/65f4c1e59f1b2a5d12345678

// ✅ Multiple PlacedModels Request (GET /placedModels/multiple?ids=ID1,ID2,ID3)
// GET /placedModels/multiple?placedModelIds=65f4c1e59f1b2a5d12345678,65f4c1e59f1b2a5d87654321

// ❌ Invalid Request (Missing ids Query)
// { "error": "IDs query parameter is required." }
