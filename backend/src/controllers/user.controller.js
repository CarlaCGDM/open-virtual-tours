import User from '../models/User.js'

export const getUsersById = async (req,res) => 
{
    const user = await User.findById(req.params.userId)
    res.status(200).json(user)
}

export const getUsers = async (req,res) => 
{
    const users = await User.find()
    res.status(200).json(users)
}

export const updateUsertById = async (req,res) => 
{
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,req.body,{new:true})
        res.status(200).json(updatedUser)
    
}

export const deleteUserById = async (req,res) => 
{
        await User.findByIdAndDelete(req.params.userId)
        res.status(204).json()
}