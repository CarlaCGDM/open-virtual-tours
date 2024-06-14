import { api } from "./configs/axiosConfigs.js"
// import { defineCancelApiObject } from "./configs/axiosUtils"


export const ConfigAPI = {

  getAll: async function () {
    const response = await api.request({
      url: "/config/",
      method: "GET",
    })

    return response.data
  },

  editOne: async function (data,id) {
    const response = await api.request({
      url: `/config/${id}`,
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    })
    
    return response.data
  },

 }