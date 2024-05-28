// Here is where the connection is established with the database
import mongoose from 'mongoose'

const DATABASE_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const DATABASE_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;

mongoose.connect(`mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}`)
    .then(db => console.log('Db is connected'))
    .catch(error => console.log(error))