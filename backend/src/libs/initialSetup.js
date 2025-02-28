import Model from '../models/Model.js'
import PlacedModel from '../models/PlacedModel.js'
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
                name: 'Statue',
                modelURL: '/uploads/models/StatueOfAHunter',
                imgURL: '',
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: '',
                license: ''
            }).save()
        ])

        console.log(values)

    } catch (error) {

        console.log(error)
    }
}

// Create demo placed model

export const createPlacedModels = async () => {
    try {

        const count = await PlacedModel.estimatedDocumentCount()

        if (count > 0) return

        const defaultModel = await Model.findOne({ name: 'Statue' })

        const values = await Promise.all([
            new PlacedModel({
                baseModel: defaultModel._id,
                position: [5,0,5],
                rotation: [0,0,0],
            }).save(),
            new PlacedModel({
                baseModel: defaultModel._id,
                position: [0,0,0],
                rotation: [0,0,0],
            }).save(),
            new PlacedModel({
                baseModel: defaultModel._id,
                position: [-5,0,-5],
                rotation: [0,0,0],
            }).save(),
        ])

        console.log(values)

    } catch (error) {

        console.log(error)
    }
}

// Create demo panels

export const createPanels = async () => {
    try {

        const count = await Panel.estimatedDocumentCount()

        if (count > 0) return

        const values = await Promise.all([
            new Panel({
                name: 'Example panel',
                imgURL: '/uploads/images/ExampleImage.png',
                description: 'Demo panel for testing purposes.',
                author: 'Open Virtual Tours',
                license: 'CC Attribution'
            }).save(),

            new Panel({
                name: 'La Gioconda',
                imgURL: '/uploads/images/LaGioconda.jpg',
                description: "The Mona Lisa (/ˌmoʊnə ˈliːsə/ MOH-nə LEE-sə; Italian: Gioconda [dʒoˈkonda] or Monna Lisa [ˈmɔnna ˈliːza]; French: Joconde [ʒɔkɔ̃d]) is a half-length portrait painting by Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance,[4][5] it has been described as 'the best known, the most visited, the most written about, the most sung about, [and] the most parodied work of art in the world'. The painting's novel qualities include the subject's enigmatic expression, monumentality of the composition, the subtle modelling of forms, and the atmospheric illusionism.",
                author: 'Leonardo da Vinci',
                license: 'CC Attribution'
            }).save(),

            new Panel({
                name: 'Astronaut',
                imgURL: '/uploads/images/Astronaut.jpg',
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: 'Unknown',
                license: 'Unknown'
            }).save(),

            new Panel({
                name: 'Cary Grant',
                imgURL: '/uploads/images/CaryGrant.jpg',
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. The 22-kiloton explosion involved a plutonium device, nicknamed “The Gadget.” It had the same design as the “Fat Man” – the bomb eventually detonated over Nagasaki on August 9th, 1945.",
                author: 'Hulton-Deutsch (Corbis)',
                license: 'CC0 Attribution'
            }).save(),

            new Panel({
                name: 'Trinity nuclear test',
                imgURL: '/uploads/images/NuclearTest.jpg',
                description: "The first-ever detonation of a nuclear weapon, code-named “Trinity,” took place at 5:29 a.m. on July 16th, 1945. Giving birth to the atomic age, this was a culmination of efforts by the scientists of the Manhattan Project. The test took place at about 35 miles (56 km) southeast of Socorro, New Mexico at what at that point was the USAAF Alamogordo Bombing and Gunnery Range.",
                author: 'Hulton-Deutsch (Corbis)',
                license: 'CC0 Attribution'
            }).save(),

        ])

        console.log(values)

    } catch (error) {

        console.log(error)
    }
}

// Create demo 3D environments

export const createEnvironments = async () => {
    try {

        const count = await Environment.estimatedDocumentCount()

        if (count > 0) return

        const defaultPlacedModels = await PlacedModel.find()
        const defaultPanel = await Panel.findOne({ name: 'Example panel' })

        const values = await Promise.all([
            new Environment({
                name: 'Medieval Church',
                description: 'Demo environment for testing purposes.',
                modelURL: '/uploads/environments/medieval_church_calatrava_la_nueva_spain',
                imgURL: '',
                author: '',
                license: '',
                modelSlots: [defaultPlacedModels[0]._id, defaultPlacedModels[1]._id, defaultPlacedModels[2]._id],
                panelSlots: [defaultPanel._id, defaultPanel._id, defaultPanel._id, defaultPanel._id, defaultPanel._id],
                path: {}
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

        const defaultEnvironment = await Environment.findOne({ name: 'Medieval Church' })

        const values = await Promise.all([
            new Config({
                contactEmail: 'carla@openvirtualtours.org',
                themeURL: '',
                tourTitle: 'Open Virtual Tours',
                tourDescription: 'Welcome to Open Virtual Tours. Follow the instructions to generate and deploy your own version of this tour.',
                tourEnvironment: defaultEnvironment._id
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
            new Role({ name: 'user' }).save(),
            new Role({ name: 'editor' }).save(),
            new Role({ name: 'admin' }).save()
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

        const editorRole = await Role.findOne({ name: 'editor' })
        const adminRole = await Role.findOne({ name: 'admin' })
        const encryptedPassword = await User.encryptPassword('password')

        const values = await Promise.all([
            new User({
                username: 'superuser',
                email: 'superuser@email.com',
                password: encryptedPassword,
                roles: [editorRole._id, adminRole._id]
            }).save()
        ])

        console.log(values)

    } catch (error) {

        console.log(error)
    }

}
