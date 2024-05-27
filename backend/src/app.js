//app.js configura la aplicación de express

import express from 'express'
import morgan from 'morgan' //middleware de express que nos muestra las peticiones que llegan a nuestro navegador
import pkg from '../package.json'
import cors from 'cors'

import {createRoles} from './libs/initialSetup'

import productRoutes from './routes/products.routes'
import exhibitRoutes from './routes/exhibit.routes'
import environmentRoutes from './routes/environment.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import uploadRoutes from './routes/upload.routes'

const app = express()
createRoles()

app.set('pkg', pkg) //guardar el valor de esta variable

app.use(morgan('dev'))
app.use(express.json())

const corsOptions = {
    origin: 'http://localhost:3000',
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

app.use('/api/products',productRoutes)
app.use('/api/exhibits',exhibitRoutes)
app.use('/api/environments',environmentRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/upload',uploadRoutes) // Delete? Save for JSON file?

export default app
