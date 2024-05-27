import { Schema, model } from 'mongoose'

const exhibitSchema = new Schema({
    name: String,
    modelURL: String,
    imgURL: String,
    description: String,
    author: String,
    license: String
},
{timestamps: true,
versionKey: false})

export default model('Exhibit', exhibitSchema)