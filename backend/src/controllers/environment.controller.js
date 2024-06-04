import { model } from 'mongoose'
import Environment from '../models/Environment.js'
import Model from '../models/Model.js'

export const createEnvironment = async (req,res) => 
{
    const {name, modelURL, imgURL, description, author, license, modelCount, panelCount, stringifiedPath} = req.body

    // decode path

    const path = JSON.parse(stringifiedPath)

    // fill panel slots with placeholder data

    const placeholderModel = await Model.findOne({name: '3D Hamburger'})
    const modelSlots = []
    for (let index = 0; index < modelCount; index++) {
        modelSlots.push(placeholderModel._id)
    }

    const panelSlots = []

    const newEnvironment = new Environment({name, modelURL, imgURL, description, author, license, modelSlots, panelSlots, path})

    const environmentSaved = await newEnvironment.save()

    res.status(201).json(environmentSaved) // nuevo recurso se ha creado
}

export const getEnvironments = async (req,res) => 
{
    const environments = await Environment.find()
    res.json(environments)
}

export const getEnvironmentById = async (req,res) => 
{
    const environment = await Environment.findById(req.params.environmentId)
    res.status(200).json(environment)
}

export const updateEnvironmentById = async (req,res) => 
{
    const updatedEnvironment = await Environment.findByIdAndUpdate(req.params.environmentId,req.body,{new:true})
    res.status(200).json(updatedEnvironment)

}

export const deleteEnvironmentById = async (req,res) => 
{
    await Environment.findByIdAndDelete(req.params.environmentId)
    res.status(204).json()
}