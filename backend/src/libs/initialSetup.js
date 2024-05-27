import Role from '../models/Role'
import User from '../models/User'

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

// Create default superadmin user with all the roles