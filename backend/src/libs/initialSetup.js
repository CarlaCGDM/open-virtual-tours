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
                name: 'Cube 01',
                modelURL: '/uploads/models/CubePreset01.glb',
                imgURL: '/uploads/images/CubePreset01.png',
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: 'Open Virtual Tours',
                license: 'CC0 Attribution'
            }).save(),

            new Model({
                name: 'Cube 02',
                modelURL: '/uploads/models/CubePreset02.glb',
                imgURL: '/uploads/images/CubePreset02.png',
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: 'Open Virtual Tours',
                license: 'CC0 Attribution'
            }).save(),

            new Model({
                name: 'Cube 03',
                modelURL: '/uploads/models/CubePreset03.glb',
                imgURL: '/uploads/images/CubePreset03.png',
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: 'Open Virtual Tours',
                license: 'CC0 Attribution'
            }).save(),

            new Model({
                name: 'Rubber duck',
                modelURL: '/uploads/models/Duck.glb',
                imgURL: '/uploads/images/Duck.png',
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: 'Sony Computer Entertainment Inc.',
                license: 'SCEA Shared Source License, Version 1.0'
            }).save(),

            new Model({
                name: 'George Washington bust',
                modelURL: '/uploads/models/GeorgeWashingtonBust.glb',
                imgURL: '/uploads/images/GeorgeWashingtonBust.png',
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: 'Smithsonian Museum',
                license: 'CC0 Attribution'
            }).save(),

            new Model({
                name: 'Cartoon Hot-Dog',
                modelURL: '/uploads/models/cartoon_hot-dog.glb',
                imgURL: '/uploads/images/cartoon_hot-dog.png',
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                author: 'TadenStar',
                license: 'CC0 Attribution'
            }).save()
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

        const defaultModel = await Model.findOne({ name: 'Cube 01' })
        const defaultPanel = await Panel.findOne({ name: 'Example panel' })

        const values = await Promise.all([
            new Environment({
                name: 'Demo Museum 01',
                description: 'Demo environment for testing purposes.',
                modelURL: '/uploads/environments/DemoMuseum01.glb',
                imgURL: '/uploads/images/ImageNotFound.jpg',
                author: 'Open Virtual Tours',
                license: 'CC Attribution',
                modelSlots: [defaultModel._id, defaultModel._id, defaultModel._id, defaultModel._id, defaultModel._id],
                panelSlots: [defaultPanel._id, defaultPanel._id, defaultPanel._id, defaultPanel._id, defaultPanel._id],
                path: {
                    "0": {
                        "x": 0.2537200450897217,
                        "y": 0,
                        "z": 8.404757499694824
                    },
                    "1": {
                        "x": -0.7325700521469116,
                        "y": 0,
                        "z": 8.228050231933594
                    },
                    "2": {
                        "x": -1.4857197999954224,
                        "y": 0,
                        "z": 7.732919216156006
                    },
                    "3": {
                        "x": -2.0980777740478516,
                        "y": 0,
                        "z": 7.014223575592041
                    },
                    "4": {
                        "x": -2.661992311477661,
                        "y": 0,
                        "z": 6.16682243347168
                    },
                    "5": {
                        "x": -3.2698118686676025,
                        "y": 0,
                        "z": 5.285575866699219
                    },
                    "6": {
                        "x": -4.013885021209717,
                        "y": 0,
                        "z": 4.465342998504639
                    },
                    "7": {
                        "x": -4.940664291381836,
                        "y": 0,
                        "z": 3.79002046585083
                    },
                    "8": {
                        "x": -5.917607307434082,
                        "y": 0,
                        "z": 3.2616896629333496
                    },
                    "9": {
                        "x": -6.854944705963135,
                        "y": 0,
                        "z": 2.774808168411255
                    },
                    "10": {
                        "x": -7.662905216217041,
                        "y": 0,
                        "z": 2.2238340377807617
                    },
                    "11": {
                        "x": -8.25171947479248,
                        "y": 0,
                        "z": 1.5032252073287964
                    },
                    "12": {
                        "x": -8.531617164611816,
                        "y": 0,
                        "z": 0.5074395537376404
                    },
                    "13": {
                        "x": -8.423270225524902,
                        "y": 0,
                        "z": -0.6179311871528625
                    },
                    "14": {
                        "x": -7.9555583000183105,
                        "y": 0,
                        "z": -1.5206788778305054
                    },
                    "15": {
                        "x": -7.224276065826416,
                        "y": 0,
                        "z": -2.2809348106384277
                    },
                    "16": {
                        "x": -6.32521915435791,
                        "y": 0,
                        "z": -2.978830337524414
                    },
                    "17": {
                        "x": -5.354183673858643,
                        "y": 0,
                        "z": -3.6944971084594727
                    },
                    "18": {
                        "x": -4.406965732574463,
                        "y": 0,
                        "z": -4.508066177368164
                    },
                    "19": {
                        "x": -3.626713752746582,
                        "y": 0,
                        "z": -5.382530212402344
                    },
                    "20": {
                        "x": -2.9389350414276123,
                        "y": 0,
                        "z": -6.273677349090576
                    },
                    "21": {
                        "x": -2.268972873687744,
                        "y": 0,
                        "z": -7.097261428833008
                    },
                    "22": {
                        "x": -1.5421711206436157,
                        "y": 0,
                        "z": -7.76903772354126
                    },
                    "23": {
                        "x": -0.6838726997375488,
                        "y": 0,
                        "z": -8.204760551452637
                    },
                    "24": {
                        "x": 0.38057848811149597,
                        "y": 0,
                        "z": -8.320184707641602
                    },
                    "25": {
                        "x": 1.315015196800232,
                        "y": 0,
                        "z": -8.08661937713623
                    },
                    "26": {
                        "x": 2.012317180633545,
                        "y": 0,
                        "z": -7.572819709777832
                    },
                    "27": {
                        "x": 2.5648841857910156,
                        "y": 0,
                        "z": -6.860602378845215
                    },
                    "28": {
                        "x": 3.0651164054870605,
                        "y": 0,
                        "z": -6.0317840576171875
                    },
                    "29": {
                        "x": 3.6054139137268066,
                        "y": 0,
                        "z": -5.1681809425354
                    },
                    "30": {
                        "x": 4.278176784515381,
                        "y": 0,
                        "z": -4.351609706878662
                    },
                    "31": {
                        "x": 5.081752300262451,
                        "y": 0,
                        "z": -3.6960718631744385
                    },
                    "32": {
                        "x": 5.9300856590271,
                        "y": 0,
                        "z": -3.1706185340881348
                    },
                    "33": {
                        "x": 6.744105339050293,
                        "y": 0,
                        "z": -2.6842732429504395
                    },
                    "34": {
                        "x": 7.44473934173584,
                        "y": 0,
                        "z": -2.146059989929199
                    },
                    "35": {
                        "x": 7.952915668487549,
                        "y": 0,
                        "z": -1.465002179145813
                    },
                    "36": {
                        "x": 8.189563751220703,
                        "y": 0,
                        "z": -0.5501232743263245
                    },
                    "37": {
                        "x": 8.075332641601562,
                        "y": 0,
                        "z": 0.5624130368232727
                    },
                    "38": {
                        "x": 7.619964599609375,
                        "y": 0,
                        "z": 1.4582966566085815
                    },
                    "39": {
                        "x": 6.91719388961792,
                        "y": 0,
                        "z": 2.219538927078247
                    },
                    "40": {
                        "x": 6.060754776000977,
                        "y": 0,
                        "z": 2.9281508922576904
                    },
                    "41": {
                        "x": 5.144381999969482,
                        "y": 0,
                        "z": 3.6661436557769775
                    },
                    "42": {
                        "x": 4.261809825897217,
                        "y": 0,
                        "z": 4.515528202056885
                    },
                    "43": {
                        "x": 3.6114461421966553,
                        "y": 0,
                        "z": 5.3658952713012695
                    },
                    "44": {
                        "x": 3.060933828353882,
                        "y": 0,
                        "z": 6.239938735961914
                    },
                    "45": {
                        "x": 2.5300889015197754,
                        "y": 0,
                        "z": 7.05925178527832
                    },
                    "46": {
                        "x": 1.938727617263794,
                        "y": 0,
                        "z": 7.745429992675781
                    },
                    "47": {
                        "x": 1.2066658735275269,
                        "y": 0,
                        "z": 8.220067024230957
                    }
                }
            }).save(),

            new Environment({
                name: 'Demo Museum 02',
                description: 'Demo environment for testing purposes.',
                modelURL: '/uploads/environments/DemoMuseum02.glb',
                imgURL: '/uploads/images/ImageNotFound.jpg',
                author: 'Open Virtual Tours',
                license: 'CC Attribution',
                modelSlots: [defaultModel._id],
                panelSlots: [defaultPanel._id, defaultPanel._id, defaultPanel._id, defaultPanel._id, defaultPanel._id],
                "path": {
                    "0": {
                        "x": -1,
                        "y": 0,
                        "z": 0
                    },
                    "1": {
                        "x": -1.0060049295425415,
                        "y": 0,
                        "z": -0.47446921467781067
                    },
                    "2": {
                        "x": -0.9969936013221741,
                        "y": 0,
                        "z": -0.7717649936676025
                    },
                    "3": {
                        "x": -0.9324266910552979,
                        "y": 0,
                        "z": -0.9324266910552979
                    },
                    "4": {
                        "x": -0.7717649936676025,
                        "y": 0,
                        "z": -0.9969934821128845
                    },
                    "5": {
                        "x": -0.4744691252708435,
                        "y": 0,
                        "z": -1.0060046911239624
                    },
                    "6": {
                        "x": 0,
                        "y": 0,
                        "z": -1
                    },
                    "7": {
                        "x": 0.47446921467781067,
                        "y": 0,
                        "z": -1.0060049295425415
                    },
                    "8": {
                        "x": 0.7717649936676025,
                        "y": 0,
                        "z": -0.9969936013221741
                    },
                    "9": {
                        "x": 0.9324266910552979,
                        "y": 0,
                        "z": -0.9324266910552979
                    },
                    "10": {
                        "x": 0.9969934821128845,
                        "y": 0,
                        "z": -0.7717649936676025
                    },
                    "11": {
                        "x": 1.0060046911239624,
                        "y": 0,
                        "z": -0.4744691252708435
                    },
                    "12": {
                        "x": 1,
                        "y": 0,
                        "z": 0
                    },
                    "13": {
                        "x": 1.0060049295425415,
                        "y": 0,
                        "z": 0.47446921467781067
                    },
                    "14": {
                        "x": 0.9969936013221741,
                        "y": 0,
                        "z": 0.7717649936676025
                    },
                    "15": {
                        "x": 0.9324266910552979,
                        "y": 0,
                        "z": 0.9324266910552979
                    },
                    "16": {
                        "x": 0.7717649936676025,
                        "y": 0,
                        "z": 0.9969934821128845
                    },
                    "17": {
                        "x": 0.4744691252708435,
                        "y": 0,
                        "z": 1.0060046911239624
                    },
                    "18": {
                        "x": 0,
                        "y": 0,
                        "z": 1
                    },
                    "19": {
                        "x": -0.47446921467781067,
                        "y": 0,
                        "z": 1.0060049295425415
                    },
                    "20": {
                        "x": -0.7717649936676025,
                        "y": 0,
                        "z": 0.9969936013221741
                    },
                    "21": {
                        "x": -0.9324266910552979,
                        "y": 0,
                        "z": 0.9324266910552979
                    },
                    "22": {
                        "x": -0.9969934821128845,
                        "y": 0,
                        "z": 0.7717649936676025
                    },
                    "23": {
                        "x": -1.0060046911239624,
                        "y": 0,
                        "z": 0.4744691252708435
                    }
                }

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

        const defaultEnvironment = await Environment.findOne({ name: 'Demo Museum 01' })

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
