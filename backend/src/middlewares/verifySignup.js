// check if the user already exists before creating it
// check if the roles exist before creating a user with them

import {ROLES} from '../models/Role'
import User from '../models/User'

export const checkDuplicateUsernameOrEmail = async (req,res,next) => {

    console.log("checking user")

    const user = await User.findOne({username: req.body.username})

    console.log(user)
    if (user) return res.status(400).json({message: 'The user already exists'})


    const email = await User.findOne({email: req.body.email})
    if (email) return res.status(400).json({message: 'The email already exists'})

    next()
}

export const checkRolesExist = (req,res,next) => {
    if (req.body.roles) {
        console.log(req.body.roles)
        for (let i = 0; i < req.body.roles.length; i++) {
            
            if (!ROLES.includes(req.body.roles[i])) {
                //si el usuario que quiere añadir no está en el array
                return res.status(400).json({message: `Role ${req.body.roles[i]} does not exist`})
            }
            
        }
    }

    next()
}