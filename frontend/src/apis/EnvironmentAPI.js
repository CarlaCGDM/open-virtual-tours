import { api } from "./configs/axiosConfigs.js"

export const EnvironmentAPI = {

  getOne: async function (id) {
    const response = await api.request({
      url: `/environments/:${id}`,
      method: "GET"
    })

    return response.data
  },

  getAll: async function () {
    const response = await api.request({
      url: "/environments/",
      method: "GET",
    })

    return response.data
  },

  createOne: async function (environment) {
    const response = await api.request({
      url: `/environments/`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data: environment
    })
    
    return response.data
  },
 }