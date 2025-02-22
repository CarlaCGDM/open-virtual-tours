import { Schema, model } from 'mongoose'
// In the future, this schema will include other fields such as:
// - Generated minigame (string)
// - Choice of option for base/pedestal

const placedModelSchema = new Schema({
    baseModel: {
        ref: "Model",
        type: Schema.Types.ObjectId
    },
    position: [Number], //x,y,z
    rotation: [Number], //x,y,z
},
{timestamps: true,
versionKey: false})

export default model('PlacedModel', placedModelSchema)