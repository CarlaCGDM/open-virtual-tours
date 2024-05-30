import Model from '../models/Model.js'
import Panel from '../models/Panel.js'
import Environment from '../models/Environment.js'
import Config from '../models/Config.js'
import Role from '../models/Role.js'
import User from '../models/User.js'

// Create demo 3D models

export const createModels = async () => {
    try {

        const count = await Model.estimatedDocumentCount()

        if (count > 0) return

        const values = await Promise.all([
            new Model({
                name: '3D Hamburger',
                modelURL: 'https://res.cloudinary.com/dahr27egc/image/upload/v1708119350/hamburger_lzybfc.glb',
                imgURL: 'https://img.freepik.com/fotos-premium/ilustracion-hamburguesa-3d-aislado-blanco-ilustracion-3d-hamburguesa_516484-24.jpg',
                description: 'Demo model for testing purposes.',
                author: 'Open Virtual Tours',
                license: 'CC Attribution'
            }).save()
        ])

        console.log(values)

    } catch (error) {

        console.log(error)
    }
}

// Create demo panels

// Create demo 3D environments

export const createEnvironments = async () => {
    try {

        const count = await Environment.estimatedDocumentCount()

        if (count > 0) return

        const values = await Promise.all([
            new Environment({
                name: 'DemoEnvironment01',
                description: 'Demo environment for testing purposes.',
                modelURL: 'https://res.cloudinary.com/dahr27egc/image/upload/v1708395495/e84qnauve9dhurvpd8n1.png',
                imgURL: 'https://res.cloudinary.com/dahr27egc/image/upload/v1708395495/e84qnauve9dhurvpd8n1.png',
                author: 'Open Virtual Tours',
                license: 'CC Attribution',
                modelSlots: [],
                panelSlots: []
                
            }).save()
        ])

        console.log(values)

    } catch (error) {

        console.log(error)
    }
}

// Create demo config

export const createConfig = async () => {
    try {

        const count = await Config.estimatedDocumentCount()

        if (count > 0) return

        const demoEnvironment = Environment.find()

        const values = await Promise.all([
            new Config({
                contactEmail: 'carla@openvirtualtours.com',
                themeURL: '',
                tourTitle: 'Open Virtual Tours',
                tourDescription: 'Welcome to Open Virtual Tours. Follow the instructions to generate and deploy your own version of this tour.',
                selectedEnvironment: demoEnvironment._id
            }).save()
        ])

        console.log(values)

    } catch (error) {

        console.log(error)
    }
}

// Create roles

export const createRoles = async () => {

    try {

        const count = await Role.estimatedDocumentCount()

        if (count > 0) return

        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'editor'}).save(),
            new Role({name: 'admin'}).save()
        ])

        console.log(values)

    } catch (error) {

        console.log(error)
    }

}

// Create superuser

export const createUsers = async () => {

    try {

        const count = await User.estimatedDocumentCount()

        if (count > 0) return

        const editorRole = Role.findOne({name: 'editor'})
        const adminRole = Role.findOne({name: 'admin'})
        const encryptedPassword = await User.encryptPassword('password')

        const values = await Promise.all([
            new User({
                username: 'superuser',
                email: 'superuser@email.com',
                password: encryptedPassword,
                roles: [editorRole._id,adminRole._id]
            }).save()
        ])

        console.log(values)

    } catch (error) {

        console.log(error)
    }

}
