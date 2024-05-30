import { api } from "./configs/axiosConfigs.js"
// import { defineCancelApiObject } from "./configs/axiosUtils"

export const ModelAPI = {
//   get: async function (id, cancel = false) {
//     const response = await api.request({
//       url: `/models/:id`,
//       method: "GET",
//       // retrieving the signal value by using the property name
//       signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
//     })

//     // returning the product returned by the API
//     return response.data.product
//   },
  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/models/",
      method: "GET",
      // signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
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
//   create: async function (product, cancel = false) {
//     await api.request({
//       url: `/models`,
//       method: "POST",
//       data: product,
//       signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
//     })
//   },
 }

// // defining the cancel API object for ModelAPI
// const cancelApiObject = defineCancelApiObject(ModelAPI)