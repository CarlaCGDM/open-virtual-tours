import { api } from "./configs/axiosConfigs.js"
// import { defineCancelApiObject } from "./configs/axiosUtils"

export const UserAPI = {

  signIn: async function (email, password) {
    try {
      const response = await api.request({
        url: "/auth/signin",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ email, password })
      });
  
      if (response.status === 200) {
        // Assuming a successful login returns a 200 status
        console.log(response.data)
        return response.data;
      } else {
        // Handle unexpected status codes here if needed
        throw new Error('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      // Handle error responses from the API
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
  
        // You can throw the error to handle it in the calling function
        throw new Error('Authentication failed: ' + error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        throw new Error('Error in setting up the request: ' + error.message);
      }
    }
  }
}