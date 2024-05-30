import Model from '../models/Model.js'

export const createModel = async (req,res) => 
{
    // What do we get from the frontend?

    console.log("Request: ")
    console.log(req.body)


    const {name, modelURL, imgURL, description, author, license} = req.body

    const newModel = new Model({name,modelURL,imgURL,description,author,license})

    const ModelSaved = await newModel.save()

    await newModel.save()

    res.status(201).json(ModelSaved) // nuevo recurso se ha creado
}

export const getModels = async (req,res) => 
{
    const Models = await Model.find()
    res.status(200).json(Models)
}

export const getModelById = async (req,res) => 
{
        const Model = await Model.findById(req.params.ModelId)
        res.status(200).json(Model)
}

export const getModelByIds = async (req,res) => 
{
    // If we are being sent multiple Ids:
    // Split by Ids:
    const ids = req.params.ModelIds.split("&")
    console.log(ids)

    // Filter out the 'nulls':

    const existing_ids = ids.filter((id) => id != "null")
    console.log(existing_ids)
        
    // Obtain list of elements:
    const unique_Models = await Model.find({ '_id': { $in: existing_ids } });
    //console.log(unique_Models)

    // Recreate list of elements including the repeats:

    const buffer = {}
    unique_Models.forEach(o => buffer[o._id] = o)
    const Models = ids.map(id => buffer[id] ? buffer [id] : null)

    // Recreate list of elements including the nulls:
    


    console.log(Models)

    res.status(200).json(Models)
}

export const updateModelById = async (req,res) => 
{
    // we use this same method to update a single element in the model slots list
    // 
    const updatedModel = await Model.findByIdAndUpdate(req.params.ModelId,req.body,{new:true})
    res.status(200).json(updatedModel)

}

export const deleteModelById = async (req,res) => 
{
    const deletedModel = await Model.findByIdAndDelete(req.params.ModelId)
    res.status(204).json(deletedModel)
}