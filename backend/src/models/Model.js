import { Schema, model } from 'mongoose'
// TODO: Rename to "BaseModel"

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