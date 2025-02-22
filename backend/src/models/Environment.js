import { Schema, model } from 'mongoose'
// TODO: "Rename to TourEnvironment"

const environmentSchema = new Schema({
    name: String,
    description: String,
    modelURL: String,
    imgURL: String,
    author: String,
    license: String,
    modelSlots: [{
        ref: "PlacedModel",
        type: Schema.Types.ObjectId,
        null: true
    }],
    panelSlots: [{
        ref: "Panel",
        type: Schema.Types.ObjectId,
        null: true
    }],
    path: Schema.Types.Mixed
},
{timestamps: true,
versionKey: false})

export default model('Environment', environmentSchema)