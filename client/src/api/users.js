import { api, API_URL } from "./axios";

export const getAllUsers = async () => {
  const res = await api.get("/users");

  return res.data.map(user => ({
    ...user,
    image: user.image
      ? `${API_URL}/uploads/users/${user.image}`
      : null,
  }));
};


export const createUsers = async(data)=>{
    const res = await api.post('/create',data);
    return res.data;
}


export const DeleteUser = async(id) =>{

  const res = await api.delete(`/users/${id}`);
  return res.data;
}


export const UpdateUsers = async(id, data) =>{

     const res = await api.put(`/users/${id}`, data);
     return res.data
}
