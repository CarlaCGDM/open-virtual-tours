import { Schema, model } from 'mongoose'

const modelSchema = new Schema({
    name: String,
    description: String,
    modelURL: String,
    imgURL: String,
    author: String,
    license: String
},
{timestamps: true,
versionKey: false})

export default model('Model', modelSchema)