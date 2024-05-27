import User from '../models/User'
import Role from '../models/Role'
import jwt from 'jsonwebtoken'
import config from '../config'

export const signUp = async (req,res) => {
    
    const {username,email,password,roles} = req.body

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name:"user"})
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()

    console.log(savedUser)
    
    const token = jwt.sign({id: savedUser._id}, config.SECRET,{
        expiresIn:86400 // 24h
    })

    res.status(200).json({token})
}
export const signIn = async (req,res) => {

    const userFound = await User.findOne({email: req.body.email}).populate("roles")

    if (!userFound) return res.status(400).json({message: "User not found"})

    console.log(userFound)

    const matchPassword = await User.comparePassword(req.body.password,userFound.password)

    console.log(matchPassword)

    if (!matchPassword) return res.status(400).json({token: null, message: "Password incorrect"})

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    })

    res.json({token})
}