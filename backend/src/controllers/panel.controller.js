import Panel from '../models/Panel.js'

export const createPanel = async (req, res) => {
    // What do we get from the frontend?

    console.log("Request: ")
    console.log(req.body)


    const { name, imgURL, description, author, license } = req.body

    const newPanel = new Panel({ name, imgURL, description, author, license })

    const panelSaved = await newPanel.save()

    await newPanel.save()

    res.status(201).json(panelSaved) // nuevo recurso se ha creado
}

export const getPanels = async (req, res) => {
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

        // Fetch panels with pagination, search filters, and sorting
        const panels = await Panel.find(query).sort(sort).skip(skip).limit(limit);

        // Count total documents matching the query
        const totalPanels = await Panel.countDocuments(query);

        // Calculate total pages
        const totalPages = Math.ceil(totalPanels / limit);

        res.status(200).json({
            panels,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getPanelById = async (req, res) => {
    console.log("trying to get panel with id: " + req.params.panelId)
    const panel = await Panel.findById(req.params.panelId)
    res.status(200).json(panel)
}

export const getPanelByIds = async (req, res) => {
    // If we are being sent multiple Ids:
    // Split by Ids:
    const ids = req.params.panelIds.split("&")
    console.log(ids)

    // Filter out the 'nulls':

    const existing_ids = ids.filter((id) => id != "null")
    console.log(existing_ids)

    // Obtain list of elements:
    const unique_panels = await Panel.find({ '_id': { $in: existing_ids } });
    //console.log(unique_panels)

    // Recreate list of elements including the repeats:

    const buffer = {}
    unique_panels.forEach(o => buffer[o._id] = o)
    const panels = ids.map(id => buffer[id] ? buffer[id] : null)

    // Recreate list of elements including the nulls:



    console.log(panels)

    res.status(200).json(panels)
}

export const updatePanelById = async (req, res) => {
    // we use this same method to update a single element in the panel slots list
    // 
    const updatedPanel = await Panel.findByIdAndUpdate(req.params.panelId, req.body, { new: true })
    res.status(200).json(updatedPanel)

}

export const deletePanelById = async (req, res) => {
    const deletedPanel = await Panel.findByIdAndDelete(req.params.panelId)
    res.status(204).json(deletedPanel)
}