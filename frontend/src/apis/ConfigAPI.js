import { api } from "./configs/axiosConfigs.js"
// import { defineCancelApiObject } from "./configs/axiosUtils"

export const ConfigAPI = {

  getAll: async function () {
    const response = await api.request({
      url: "/config/",
      method: "GET",
    })

    return response.data
  }

 }