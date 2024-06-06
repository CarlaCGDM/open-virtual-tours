import { api } from "./configs/axiosConfigs.js"
// import { defineCancelApiObject } from "./configs/axiosUtils"

export const ModelAPI = {

  getOne: async function (id) {
    const response = await api.request({
      url: `/models/${id}`,
      method: "GET"
    })

    return response.data
  },

  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/models/",
      method: "GET",
      // signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },

  createOne: async function (model, cancel = false) {
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

//   search: async function (name, cancel = false) {
//     const response = await api.request({
//       url: "/models/search",
//       method: "GET",
//       params: {
//         name: name,
//       },
//       signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
//     })

//     return response.data.models
//   },
 }

// // defining the cancel API object for ModelAPI
// const cancelApiObject = defineCancelApiObject(ModelAPI)