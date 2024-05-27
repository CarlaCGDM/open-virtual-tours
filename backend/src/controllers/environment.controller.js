import Environment from '../models/Environment'

export const createEnvironment = async (req,res) => 
{
    const {name, modelURL, imgURL, pathURL, description, author, license, exhibits, panels, isUsed} = req.body

    // exhibits and panels is a number
    // we create an array of empty 

    const modelSlots = []
    const panelSlots = []

    for (let i = 0; i < exhibits; i++) {
        modelSlots.push(null) // <- Create a placeholder 3D model
        
    }

    for (let i = 0; i < panels; i++) {
        panelSlots.push(null) // <- Create a placeholder 3D model
        
    }

    const newEnvironment = new Environment({name,modelURL,imgURL,pathURL,description,author,license, modelSlots, panelSlots, isUsed})

    const environmentSaved = await newEnvironment.save()

    await newEnvironment.save()

    res.status(201).json(environmentSaved) // nuevo recurso se ha creado
}

export const getEnvironments = async (req,res) => 
{
    const environments = await Environment.find()
    res.json(environments)
}

export const getSelectedEnvironment = async (req,res) => 
{
    
    const environment = await Environment.findOne({isUsed:1})
    res.status(200).json(environment)
}

export const getEnvironmentById = async (req,res) => 
{
    const environment = await Environment.findById(req.params.environmentId)
    res.status(200).json(environment)
}

export const updateEnvironmentById = async (req,res) => 
{
    const updatedEnvironment = await Environment.findByIdAndUpdate(req.params.environmentId,req.body,{new:true})
    res.status(200).json(updatedEnvironment)

}

export const deleteEnvironmentById = async (req,res) => 
{
    await Environment.findByIdAndDelete(req.params.environmentId)
    res.status(204).json()
}

export const selectEnvironmentById = async (req,res) => 
{
    // Deselect current selected environment
    let oldEnvironment = await Environment.findOne({isUsed:1})
    await Environment.findByIdAndUpdate(oldEnvironment._id,{isUsed:0},{new:true})
    

    // Select new enviornment
    const newEnvironment = await Environment.findByIdAndUpdate(req.params.environmentId,{isUsed:1},{new:true})
    res.status(200).json(newEnvironment)
}