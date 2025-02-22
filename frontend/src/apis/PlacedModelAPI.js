import { api } from "./configs/axiosConfigs.js"

export const PlacedModelAPI = {

    getOne: async function (id) {
        const response = await api.request({
            url: `/placedModels/${id}`,
            method: "GET"
        })

        return response.data
    },

    deleteOne: async function (id) {
        const response = await api.request({
            url: `/placedModels/${id}`,
            method: "DELETE"
        })

        return response.data
    },

    getAll: async function () {
        const response = await api.request({
            url: "/placedModels/",
            method: "GET",
            // signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        })

        return response.data
    },

    getMultipleByIds: async function (ids) {
        const response = await api.request({
            url: `/placedModels/multiple?placedModelIds=${ids.join(',')}`,
            method: "GET"
        })

        return response.data
    },

    /* getAllPaginated: async function (page,limit,query,sort) {
      const response = await api.request({
        url: `/models?page=${page}&limit=${limit}&search=${query}&sort=${sort}`,
        method: "GET",
        // signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
      })
  
      return response.data
    }, */

    createOne: async function (placedModel) {
        const response = await api.request({
            url: `/placedModels/`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: placedModel
        })

        return response.data
    },

    editOne: async function (placedModel, id) {
        const response = await api.request({
            url: `/placedModels/${id}`,
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            data: placedModel
        })

        return response.data
    },

}