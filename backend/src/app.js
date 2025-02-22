//app.js configura la aplicación de express

import express from 'express'
import morgan from 'morgan' //middleware de express que nos muestra las peticiones que llegan a nuestro navegador
import pkg from '../package.json' with { type: "json" };
import cors from 'cors'

import * as initDB from './libs/initialSetup.js'

import modelRoutes from './routes/model.routes.js'
import panelRoutes from './routes/panel.routes.js'
import environmentRoutes from './routes/environment.routes.js'
import placedModelRoutes from './routes/placedModel.routes.js'
import authRoutes from './routes/auth.routes.js'
import configRoutes from './routes/config.routes.js'
import userRoutes from './routes/user.routes.js'
import uploadRoutes from './routes/upload.routes.js'

// Create a function to initialize the database in sequence
const initializeDatabase = async () => {
    try {
        // Initialize in order
        await initDB.createModels()
        await initDB.createPlacedModels()
        await initDB.createPanels()
        await initDB.createEnvironments()
        await initDB.createConfig()
        await initDB.createRoles()
        await initDB.createUsers()
        console.log('Database initialized successfully')
    } catch (error) {
        console.error('Error initializing the database:', error)
    }
}

// Run the initialization function
initializeDatabase()

const app = express()

app.set('pkg', pkg) //guardar el valor de esta variable

app.use(morgan('dev'))
app.use(express.json())

const corsOptions = {
    origin: ['https://openvirtualtours.org', 'https://www.openvirtualtours.org', "http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
};
 
app.use(cors(corsOptions));

app.get('/', (req,res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/models',modelRoutes)
app.use('/api/panels',panelRoutes)
app.use('/api/environments',environmentRoutes)
app.use('/api/placedModels',placedModelRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/config',configRoutes)
app.use('/api/users',userRoutes)
app.use('/api/upload',uploadRoutes)

export default app


