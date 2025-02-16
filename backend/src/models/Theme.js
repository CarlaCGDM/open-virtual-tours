import { Schema, model } from 'mongoose'

const themeSchema = new Schema({
    name: String,
    darkColor: String,
    lightColor: String,
    mediumColor: String,
    borderThickness: String,
    borderRadius: String
},
{timestamps: true,
versionKey: false})

export default model('Theme', themeSchema)