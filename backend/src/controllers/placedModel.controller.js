import PlacedModel from '../models/PlacedModel.js'
import Model from '../models/Model.js'; 

export const createPlacedModel = async (req, res) => {
  try {
    console.log("Incoming request to create PlacedModel:", req.body);

    let { baseModel, position, rotation } = req.body;

    // Validate required fields except baseModel (it can be auto-assigned)
    if (!position || !rotation) {
      return res.status(400).json({ error: "position and rotation are required." });
    }

    // If baseModel is empty, fetch the oldest model
    if (!baseModel) {
      console.log("baseModel is empty, fetching placeholder...");
      const oldestModel = await Model.findOne().sort({ createdAt: 1 }); // Oldest model based on creation date

      if (!oldestModel) {
        return res.status(500).json({ error: "No models found to use as a placeholder." });
      }

      baseModel = oldestModel._id.toString();
      console.log("Assigned placeholder baseModel:", baseModel);
    }

    // Validate baseModel format
    if (!baseModel.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid baseModel ID format." });
    }

    // Create and save the new PlacedModel
    const newPlacedModel = new PlacedModel({ baseModel, position, rotation });
    const placedModelSaved = await newPlacedModel.save();

    res.status(201).json(placedModelSaved);
  } catch (error) {
    console.error("Error creating PlacedModel:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal Server Error." });
  }
};

  export const getAllPlacedModels = async (req, res) => {
    try {
      const placedModels = await PlacedModel.find();
  
      if (!placedModels || placedModels.length === 0) {
        return res.status(404).json({ error: "No placed models found." });
      }
  
      res.status(200).json(placedModels);
    } catch (error) {
      console.error("Error fetching all placed models:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  };  
  

export const getPlacedModelById = async (req, res) => {
    try {
      // 1. Extract ID from request
      const { placedModelId } = req.params;
  
      // 2. Validate ID is provided
      if (!placedModelId) {
        return res.status(400).json({ error: "placedModelId is required." });
      }
  
      // 3. Validate ID format (Mongoose ObjectId check)
      if (!placedModelId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: "Invalid ID format." });
      }
  
      // 4. Query database
      const placedModel = await PlacedModel.findById(placedModelId);
  
      // 5. Handle "Not Found" case
      if (!placedModel) {
        return res.status(404).json({ error: "PlacedModel not found." });
      }
  
      // 6. Return the found model
      res.status(200).json(placedModel);
  
    } catch (error) {
      console.error("Error fetching PlacedModel:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  };  

export const getPlacedModelsByIds = async (req, res) => {
  try {

    console.log(req.query)
    // Extract the placedModelIds from the query string
    const { placedModelIds } = req.query;
    console.log(placedModelIds)
    
    // If no IDs are provided, return an error
    if (!placedModelIds) {
      return res.status(400).json({ error: "No placedModelIds provided." });
    }

    // Split the IDs (they come as a single string joined by "&")
    const ids = placedModelIds.split(",");

    // Find all placedModels with the specified IDs
    const placedModels = await PlacedModel.find({ '_id': { $in: ids } });

    // If no models found, return a 404 response
    if (placedModels.length === 0) {
      return res.status(404).json({ error: "No PlacedModels found for the provided IDs." });
    }

    // Return the found placedModels
    res.status(200).json(placedModels);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updatePlacedModel = async (req, res) => {
    try {
      const { placedModelId } = req.params;
      const updates = req.body; // Fields to update
  
      // Validate ID format
      if (!placedModelId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: "Invalid PlacedModel ID format." });
      }
  
      // Ensure there is at least one field to update
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "At least one field must be provided for update." });
      }
  
      // Update document in the database
      const updatedPlacedModel = await PlacedModel.findByIdAndUpdate(
        placedModelId,
        updates,
        { new: true, runValidators: true } // Returns updated doc & validates fields
      );
  
      // If no document found, return 404
      if (!updatedPlacedModel) {
        return res.status(404).json({ error: "PlacedModel not found." });
      }
  
      // Return the updated document
      res.status(200).json(updatedPlacedModel);
  
    } catch (error) {
      console.error("Error updating PlacedModel:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  };

  export const deletePlacedModel = async (req, res) => {
    try {
      const { placedModelId } = req.params;
  
      // Validate ID format
      if (!placedModelId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: "Invalid PlacedModel ID format." });
      }
  
      // Attempt to delete the document
      const deletedPlacedModel = await PlacedModel.findByIdAndDelete(placedModelId);
  
      // If no document was found, return 404
      if (!deletedPlacedModel) {
        return res.status(404).json({ error: "PlacedModel not found." });
      }
  
      // Return success message
      res.status(200).json({ message: "PlacedModel deleted successfully." });
  
    } catch (error) {
      console.error("Error deleting PlacedModel:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  };
  