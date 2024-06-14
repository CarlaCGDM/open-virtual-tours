import { api } from "./configs/axiosConfigs.js"

export const PanelAPI = {

  getOne: async function (id) {
    const response = await api.request({
      url: `/panels/${id}`,
      method: "GET"
    })

    return response.data
  },

  deleteOne: async function (id) {
    const response = await api.request({
      url: `/panels/${id}`,
      method: "DELETE"
    })

    return response.data
  },

  getAll: async function () {
    const response = await api.request({
      url: "/panels/",
      method: "GET",
      // signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },

  getAllPaginated: async function (page,limit,query,sort) {
    const response = await api.request({
      url: `/panels?page=${page}&limit=${limit}&search=${query}&sort=${sort}`,
      method: "GET",
      // signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },

  createOne: async function (panel) {
    const response = await api.request({
      url: `/panels/`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data: panel
    })
    
    return response.data
  },

  editOne: async function (panel,id) {
    const response = await api.request({
      url: `/panels/${id}`,
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      data: panel
    })
    
    return response.data
  },

  isUsed: async function (id) {
    const response = await api.request({
      url: `/environments/isPanelInUse/${id}`,
      method: "GET"
    })

    return response.data
  }

 }