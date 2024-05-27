//index.js sirve para que arranque la aplicación

import app from './app.js'
import './database.js'

app.listen(4000)
console.log("Server listening on port",4000)