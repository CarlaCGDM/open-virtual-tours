import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'

// Ejecutar en rutas donde queremos verificar que el usuario tiene autorización

export const verifyToken = async (req,res,next) => {
    try {

        const token = req.headers["x-access-token"]

        console.log(token)
        
        if (!token) return res.status(403).json({message: "No token provided"})

        const decoded = jwt.verify(token,config.SECRET)
        req.userId = decoded.id

        const user = await User.findById(req.userId, {password:0})
        if (!user) return res.status(404).json({message: "Token invalid, no user found"})

        next()

    } catch (error) {
        return res.status(401).json({message: "Unauthorized token"})
    }
}

export const isEditor = async (req,res,next) => {
    const user = await User.findById(req.userId)
    console.log(user)
    const roles = await Role.find({_id:{$in: user.roles}})

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name == "editor") {
            next()
            return
        }
    }

    return res.status(403).json({message: "Requires editor role"})
}

export const isAdmin = async (req,res,next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id:{$in: user.roles}})

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name == "admin") {
            next()
            return
        }
    }

    return res.status(403).json({message: "Requires admin role"})
}