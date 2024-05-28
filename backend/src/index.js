// This is the entry point to the application
import app from './app.js'
import './database.js'

const SERVER_PORT = process.env.SERVER_PORT;

app.listen(SERVER_PORT)
console.log("Server listening on port",SERVER_PORT)