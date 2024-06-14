import { api } from "./configs/axiosConfigs.js"

export const ModelAPI = {

  getOne: async function (id) {
    const response = await api.request({
      url: `/models/${id}`,
      method: "GET"
    })

    return response.data
  },

  deleteOne: async function (id) {
    const response = await api.request({
      url: `/models/${id}`,
      method: "DELETE"
    })

    return response.data
  },

  getAll: async function () {
    const response = await api.request({
      url: "/models/",
      method: "GET",
      // signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },

  getAllPaginated: async function (page,limit,query,sort) {
    const response = await api.request({
      url: `/models?page=${page}&limit=${limit}&search=${query}&sort=${sort}`,
      method: "GET",
      // signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },

  createOne: async function (model) {
    const response = await api.request({
      url: `/models/`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data: model
    })
    
    return response.data
  },

  editOne: async function (model,id) {
    const response = await api.request({
      url: `/models/${id}`,
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      data: model
    })
    
    return response.data
  },

  isUsed: async function (id) {
    const response = await api.request({
      url: `/environments/isModelInUse/${id}`,
      method: "GET"
    })

    return response.data
  }

 }