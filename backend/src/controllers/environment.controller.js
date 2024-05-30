import Environment from '../models/Environment.js'

export const createEnvironment = async (req,res) => 
{
    const {name, modelURL, imgURL, description, author, license, modelsCount, panelsCount} = req.body

    // models and panels is a number
    // we create an array of empty 

    const modelSlots = []
    const panelSlots = []

    for (let i = 0; i < modelsCount; i++) {
        modelSlots.push(null) // <- Create a placeholder 3D model
        
    }

    for (let i = 0; i < panelsCount; i++) {
        panelSlots.push(null) // <- Create a placeholder 3D model
        
    }
t
    const newEnvironment = new Environment({name, modelURL, imgURL, description, author, license, modelSlots, panelSlots})

    const environmentSaved = await newEnvironment.save()

    await newEnvironment.save()

    res.status(201).json(environmentSaved) // nuevo recurso se ha creado
}

export const getEnvironments = async (req,res) => 
{
    const environments = await Environment.find()
    res.json(environments)
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