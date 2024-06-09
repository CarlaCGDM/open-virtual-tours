import Model from '../models/Model.js'

export const createModel = async (req, res) => {
    // What do we get from the frontend?

    console.log("Request: ")
    console.log(req.body)


    const { name, modelURL, imgURL, description, author, license } = req.body

    const newModel = new Model({ name, modelURL, imgURL, description, author, license })

    const modelSaved = await newModel.save()

    await newModel.save()

    res.status(201).json(modelSaved) // nuevo recurso se ha creado
}

export const getModels = async (req, res) => {
    try {
        // Get page, limit, search query, and sort type from query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const searchQuery = req.query.search || '';
        const sortType = req.query.sort || 'newest'; // Default sorting type
        const skip = (page - 1) * limit;

        // Construct the query object
        const query = {};

        // Add conditions for name and description if search query is provided
        if (searchQuery) {
            query.$or = [
                { name: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } }
            ];
        }

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

        // Fetch models with pagination, search filters, and sorting
        const models = await Model.find(query).sort(sort).skip(skip).limit(limit);

        // Count total documents matching the query
        const totalModels = await Model.countDocuments(query);

        // Calculate total pages
        const totalPages = Math.ceil(totalModels / limit);

        res.status(200).json({
            models,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getModelById = async (req, res) => {
    const model = await Model.findById(req.params.modelId)
    res.status(200).json(model)
}

export const getModelByIds = async (req, res) => {
    // If we are being sent multiple Ids:
    // Split by Ids:
    const ids = req.params.modelIds.split("&")
    console.log(ids)

    // Filter out the 'nulls':

    const existing_ids = ids.filter((id) => id != "null")
    console.log(existing_ids)

    // Obtain list of elements:
    const unique_models = await Model.find({ '_id': { $in: existing_ids } });
    //console.log(unique_models)

    // Recreate list of elements including the repeats:

    const buffer = {}
    unique_models.forEach(o => buffer[o._id] = o)
    const models = ids.map(id => buffer[id] ? buffer[id] : null)

    // Recreate list of elements including the nulls:



    console.log(models)

    res.status(200).json(models)
}

export const updateModelById = async (req, res) => {
    // we use this same method to update a single element in the model slots list
    // 
    const updatedModel = await Model.findByIdAndUpdate(req.params.modelId, req.body, { new: true })
    res.status(200).json(updatedModel)

}

export const deleteModelById = async (req, res) => {
    const deletedModel = await Model.findByIdAndDelete(req.params.modelId)
    res.status(204).json(deletedModel)
}