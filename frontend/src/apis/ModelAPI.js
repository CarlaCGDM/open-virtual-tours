import { api } from "./configs/axiosConfigs.js"
// import { defineCancelApiObject } from "./configs/axiosUtils"

export const ModelAPI = {

  getOne: async function (id, cancel = false) {
    const response = await api.request({
      url: `/models/:${id}`,
      method: "GET"
      // signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    // returning the product returned by the API
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
    await api.request({
      url: `/models/`,
      method: "POST",
      data: model,
      // signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    })
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