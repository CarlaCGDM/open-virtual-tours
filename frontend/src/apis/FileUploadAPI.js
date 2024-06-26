import { api } from "./configs/axiosConfigs.js"

export const FileUploadAPI = {

uploadImage: async function (formData) {
    const response = await api.request({
        url: `/upload/image`,
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
})
        
    return response.data
},

uploadModel: async function (formData) {
    const response = await api.request({
        url: `/upload/model`,
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
})
    
    return response.data
},

uploadEnvironment: async function (formData) {
    const response = await api.request({
        url: `/upload/environment`,
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
})
    
    return response.data
}

}
