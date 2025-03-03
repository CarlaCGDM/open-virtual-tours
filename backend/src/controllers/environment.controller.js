import Environment from '../models/Environment.js'
import Model from '../models/Model.js'
import Panel from '../models/Panel.js'

export const createEnvironment = async (req, res) => {
    const { name, modelURL, imgURL, description, author, license, modelSlots, panelCount, stringifiedPath } = req.body

    // decode path

    let path = ""
    if (stringifiedPath) {
        path = JSON.parse(stringifiedPath)
    }

    // make sure modelSlots is an array of objects???

     // 🔥 Ensure modelSlots is an array of ObjectIds
     if (typeof modelSlots === "string") {
        modelSlots = modelSlots.split(',').map(id => new mongoose.Types.ObjectId(id.trim()));
    }

    // fill panel slots with placeholder data (TO BE REPLACED!!!!!!!!!!!!!!!!!)

    const placeholderPanel = await Panel.findOne({ name: 'Example panel' })
    const panelSlots = []
    for (let index = 0; index < panelCount; index++) {
        panelSlots.push(placeholderPanel._id)
    }

    // create new environment

    const newEnvironment = new Environment({ name, modelURL, imgURL, description, author, license, modelSlots, panelSlots, path })

    // send response

    const environmentSaved = await newEnvironment.save()
    res.status(201).json(environmentSaved) // nuevo recurso se ha creado
}

export const getEnvironments = async (req, res) => {
    try {
        // Get page, limit, search query, and sort type from query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const searchQuery = req.query.search || '';
        const sortType = req.query.sort || 'newest'; // Default sorting type
        const skip = (page - 1) * limit;

        // Construct the query object
        const query = {};

        // Add conditions for name if search query is provided
        if (searchQuery) {
            query.name = { $regex: searchQuery, $options: 'i' };
        }

        // if (searchQuery) {
        //     query.$or = [
        //         { name: { $regex: searchQuery, $options: 'i' } },
        //         { description: { $regex: searchQuery, $options: 'i' } }
        //     ];
        // }

        // Construct the sorting object based on sort type
        let sort = {};
        switch (sortType) {
            case 'oldest':
                sort = { createdAt: 1 };
                break;
            case 'name_asc':
                sort = { name: 1 };
                break;
            case 'name_desc':
                sort = { name: -1 };
                break;
            default:
                sort = { createdAt: -1 }; // Default to newest
        }

        // Fetch environments with pagination, search filters, and sorting
        const environments = await Environment.find(query).sort(sort).skip(skip).limit(limit);

        // Count total documents matching the query
        const totalEnvironments = await Environment.countDocuments(query);

        // Calculate total pages
        const totalPages = Math.ceil(totalEnvironments / limit);

        res.status(200).json({
            environments,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEnvironmentById = async (req, res) => {
    const environment = await Environment.findById(req.params.environmentId)
    res.status(200).json(environment)
}

export const updateEnvironmentById = async (req, res) => {
    const updatedEnvironment = await Environment.findByIdAndUpdate(req.params.environmentId, req.body, { new: true })
    res.status(200).json(updatedEnvironment)

}

export const deleteEnvironmentById = async (req, res) => {
    await Environment.findByIdAndDelete(req.params.environmentId)
    res.status(204).json()
}

export const isModelInUse = async (req, res) => {
    const { modelId } = req.params;

    try {
        const environments = await Environment.find({
            modelSlots: modelId
        });

        const isInUse = environments.length > 0;
        res.status(200).json({ inUse: isInUse });
    } catch (error) {
        res.status(500).json({ message: 'Failed to check model usage', error: error.message });
    }
};

export const isPanelInUse = async (req, res) => {
    const { panelId } = req.params;

    try {
        const environments = await Environment.find({
            panelSlots: panelId
        });

        const isInUse = environments.length > 0;
        res.status(200).json({ inUse: isInUse });
    } catch (error) {
        res.status(500).json({ message: 'Failed to check panel usage', error: error.message });
    }
};