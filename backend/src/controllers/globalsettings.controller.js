import Setting from '../models/Globalsetting'

export const createSetting = async (req,res) => 
{
    const {name, environment} = req.body

    const newSetting = new Setting({name,environment})

    const settingSaved = await newSetting.save()

    await newSetting.save()

    res.status(201).json(settingSaved) // nuevo recurso se ha creado
}

export const getSettings = async (req,res) => 
{
    const settings = await Setting.find()
    res.json(settings)
}

export const getSettingById = async (req,res) => 
{
    const setting = await Setting.findById(req.params.settingId)
    res.status(200).json(setting)
}

export const updateSettingById = async (req,res) => 
{
    const updatedSetting = await Setting.findByIdAndUpdate(req.params.settingId,req.body,{new:true})
    res.status(200).json(updatedSetting)

}

export const deleteSettingById = async (req,res) => 
{
    await Setting.findByIdAndDelete(req.params.settingId)
    res.status(204).json()
}