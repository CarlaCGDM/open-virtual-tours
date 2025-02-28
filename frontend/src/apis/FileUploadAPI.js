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
    },

    /**
    * Upload large ZIP files in chunks
   */

    uploadFileInChunks: async function (file, onProgress, chunkSize = 5 * 1024 * 1024) {
        const totalChunks = Math.ceil(file.size / chunkSize);
        let response;
    
        for (let i = 0; i < totalChunks; i++) {
            const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
            console.log(chunk);
            const formData = new FormData();
    
            formData.append("chunk", chunk);
            formData.append("chunkIndex", i);
            formData.append("totalChunks", totalChunks);
            formData.append("filename", file.name);
            formData.append("modelName", file.name.split('.')[0]);
    
            console.log("FormData entries before sending:", [...formData.entries()]);// 🔥 Debug entire formData
    
            try {
                // Send the request and await the response
                response = await api.request({
                    url: `/upload/chunk`,
                    method: "POST",
                    headers: { "Content-Type": "multipart/form-data" },
                    data: formData,
                });
    
                console.log(`Uploaded chunk ${i + 1}/${totalChunks}`, response);
    
                if (onProgress) {
                    onProgress(((i + 1) / totalChunks) * 100);
                }
    
                // After the last chunk, check the final response for the full result
                if (i === totalChunks - 1 && response && response.data && response.data.modelURL) {
                    console.log("File uploaded successfully. Model URL:", response.data.modelURL);
                    return response.data.modelURL;  // Return the model URL after all chunks are uploaded
                }
            } catch (error) {
                console.error("Error uploading chunk:", error);
                throw new Error("Chunk upload failed");
            }
        }
    
        console.log("All chunks uploaded!");
    }
    

}
