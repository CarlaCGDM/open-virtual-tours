import { api } from "./configs/axiosConfigs.js"

export const PanelAPI = {

  getOne: async function (id) {
    const response = await api.request({
      url: `/panels/${id}`,
      method: "GET"
      // signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
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
}