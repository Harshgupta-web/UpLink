const { default :axios}=require("axios");

export const BASE_URL ="https://uplink-api-4yrq.onrender.com"


export const clientServer =axios.create({
    baseURL:BASE_URL,
})