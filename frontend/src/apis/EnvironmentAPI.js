import { api } from "./configs/axiosConfigs.js"

export const EnvironmentAPI = {

  getOne: async function (id, cancel = false) {
    const response = await api.request({
      url: `/environments/:${id}`,
      method: "GET"
    })

    return response.data
  },

  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/environments/",
      method: "GET",
    })

    return response.data
  },

  createOne: async function (environment, cancel = false) {
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