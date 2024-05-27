import { Schema, model } from 'mongoose'

const environmentSchema = new Schema({
    name: String,
    modelURL: String,
    imgURL: String,
    pathURL: String,
    description: String,
    author: String,
    license: String,
    modelSlots: [{
        ref: "Exhibit",
        type: Schema.Types.ObjectId,
        null: true
    }],
    panelSlots: [
        {
            // ref: "Panel",
            // type: Schema.Types.ObjectId
            type: String,
            null: true
        }
    ],
    isUsed: Boolean
},
{timestamps: true,
versionKey: false})

export default model('Environment', environmentSchema)