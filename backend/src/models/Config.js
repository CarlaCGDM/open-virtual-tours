import { Schema, model } from 'mongoose'

const configSchema = new Schema({
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

export default model('Config', configSchema)