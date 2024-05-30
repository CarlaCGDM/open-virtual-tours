import { Schema, model } from 'mongoose'

const Config = new Schema({
    contactEmail: String,
    themeURL: String,
    tourTitle: String,
    tourDescription: String,
    environment: {
        ref: "Environment",
        type: Schema.Types.ObjectId
    }
},
{timestamps: true,
versionKey: false})

export default model('Globalsetting', globalsettingSchema)