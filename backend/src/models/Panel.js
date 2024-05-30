import { Schema, model } from 'mongoose'

const panelSchema = new Schema({
    name: String,
    description: String,
    imgURL: String,
    author: String,
    license: String
},
{timestamps: true,
versionKey: false})

export default model('Panel', panelSchema)