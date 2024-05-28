//app.js configura la aplicación de express

import express from 'express'
import morgan from 'morgan' //middleware de express que nos muestra las peticiones que llegan a nuestro navegador
import pkg from '../package.json' with { type: "json" };
import cors from 'cors'

import {createRoles} from './libs/initialSetup.js'

import productRoutes from './routes/products.routes.js'
import exhibitRoutes from './routes/exhibit.routes.js'
import environmentRoutes from './routes/environment.routes.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import uploadRoutes from './routes/upload.routes.js'

const app = express()
createRoles()

app.set('pkg', pkg) //guardar el valor de esta variable

app.use(morgan('dev'))
app.use(express.json())

app.use(cors())

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
