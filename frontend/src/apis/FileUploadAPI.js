import { api } from "./configs/axiosConfigs.js"
// import { defineCancelApiObject } from "./configs/axiosUtils"

export const FileUploadAPI = {

uploadImage: async function (id, cancel = false) {
    const response = await api.request({
        url: `/upload/image`,
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        }
})
        
    return response.data
},

uploadModel: async function (id, cancel = false) {
    const response = await api.request({
        url: `/upload/model`,
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        }
})
    
    return response.data
},

uploadEnvironment: async function (id, cancel = false) {
    const response = await api.request({
        url: `/upload/environment`,
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        }
})
    
    return response.data
}

}
