
import api  from "./axios.js";

export const getAllUsers = async()=>{

    const res = await api.get('/users');
    return res.data;
}


