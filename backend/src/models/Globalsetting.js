import { Schema, model } from 'mongoose'

const globalsettingSchema = new Schema({
    name: String,
    environment: {
        ref: "Environment",
        type: Schema.Types.ObjectId
    }
},
{timestamps: true,
versionKey: false})

export default model('Globalsetting', globalsettingSchema)