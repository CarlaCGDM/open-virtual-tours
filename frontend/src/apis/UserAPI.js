import { api } from "./configs/axiosConfigs.js"
// import { defineCancelApiObject } from "./configs/axiosUtils"

export const UserAPI = {

  signIn: async function (email,password) {
    console.log(JSON.stringify({email,password}))
    const response = await api.request({
      url: "/auth/signin",
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ email, password })
    })

    return response.data
  }
}