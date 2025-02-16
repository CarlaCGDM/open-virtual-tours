import Theme from '../models/Theme.js'

export const createTheme = async (req, res) => {

    const { name, darkColor, lightColor, mediumColor, borderThickness, borderRadius } = req.body

    const newTheme = new Theme({ name, darkColor, lightColor, mediumColor, borderThickness, borderRadius })

    const themeSaved = await newTheme.save()

    await newTheme.save()

    res.status(201).json(themeSaved) // nuevo recurso se ha creado
}

export const getThemeById = async (req, res) => {
    const theme = await Theme.findById(req.params.themeId)
    res.status(200).json(theme)
}

export const getThemes = async (req, res) => {
    const themes = await Theme.find()
    res.status(200).json(themes)
}

export const updateThemeById = async (req, res) => {
    // we use this same method to update a single element in the theme slots list
    // 
    const updatedTheme = await Theme.findByIdAndUpdate(req.params.themeId, req.body, { new: true })
    res.status(200).json(updatedTheme)

}

export const deleteThemeById = async (req, res) => {
    const deletedTheme = await Theme.findByIdAndDelete(req.params.themeId)
    res.status(204).json(deletedTheme)
}