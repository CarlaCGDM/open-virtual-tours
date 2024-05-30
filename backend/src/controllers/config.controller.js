import Config from '../models/Config.js'

// Finds the only Config object and returns it

export const getConfig = async (req,res) => 
{
    const config = await Config.find()
    res.json(config[0])
}

// Finds the only Config obect and updates it

export const updateConfig = async (req,res) => 
{
    const updatedConfig = await Config.findByIdAndUpdate(req.params.configId,req.body,{new:true})
    res.status(200).json(updatedConfig)
}