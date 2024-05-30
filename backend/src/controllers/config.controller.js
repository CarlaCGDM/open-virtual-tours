import Config from '../models/Config.js'

// Finds the only Config object and returns it

export const getConfig = async (req,res) => 
{
    const settings = await Config.find()
    res.json(settings[0])
}

// Finds the only Config obect and updates it

export const updateConfig = async (req,res) => 
{
    const updatedSetting = await Setting.findByIdAndUpdate(req.params.settingId,req.body,{new:true})
    res.status(200).json(updatedSetting)
}