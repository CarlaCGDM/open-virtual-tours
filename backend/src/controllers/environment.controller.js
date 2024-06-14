import { model } from 'mongoose'
import Environment from '../models/Environment.js'
import Model from '../models/Model.js'
import Panel from '../models/Panel.js'

export const createEnvironment = async (req, res) => {
    const { name, modelURL, imgURL, description, author, license, modelCount, panelCount, stringifiedPath } = req.body

    // decode path

    const path = JSON.parse(stringifiedPath)

    // fill model and panel slots with placeholder data

    const placeholderModel = await Model.findOne({ name: 'Rubber duck' })
    const modelSlots = []
    for (let index = 0; index < modelCount; index++) {
        modelSlots.push(placeholderModel._id)
    }

    const placeholderPanel = await Panel.findOne({ name: 'Example panel' })
    const panelSlots = []
    for (let index = 0; index < panelCount; index++) {
        panelSlots.push(placeholderPanel._id)
    }

    // create new environment

    const newEnvironment = new Environment({ name, modelURL, imgURL, description, author, license, modelSlots, panelSlots, path })

    // send response

    const environmentSaved = await newEnvironment.save()
    res.status(201).json(environmentSaved) // nuevo recurso se ha creado
}

export const getEnvironments = async (req, res) => {
    const environments = await Environment.find()
    res.status(200).json(environments)
}

export const getEnvironmentById = async (req, res) => {
    const environment = await Environment.findById(req.params.environmentId)
    res.status(200).json(environment)
}

export const updateEnvironmentById = async (req, res) => {
    const updatedEnvironment = await Environment.findByIdAndUpdate(req.params.environmentId, req.body, { new: true })
    res.status(200).json(updatedEnvironment)

}

export const deleteEnvironmentById = async (req, res) => {
    await Environment.findByIdAndDelete(req.params.environmentId)
    res.status(204).json()
}

export const isModelInUse = async (req, res) => {
    const { modelId } = req.params;

    try {
        const environments = await Environment.find({
            modelSlots: modelId
        });

        const isInUse = environments.length > 0;
        res.status(200).json({ inUse: isInUse });
    } catch (error) {
        res.status(500).json({ message: 'Failed to check model usage', error: error.message });
    }
};

export const isPanelInUse = async (req, res) => {
    const { panelId } = req.params;

    try {
        const environments = await Environment.find({
            panelSlots: panelId
        });

        const isInUse = environments.length > 0;
        res.status(200).json({ inUse: isInUse });
    } catch (error) {
        res.status(500).json({ message: 'Failed to check panel usage', error: error.message });
    }
};