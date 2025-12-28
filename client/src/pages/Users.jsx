import React from 'react'
import { useState } from 'react'
import { DeleteUser, getAllUsers } from '../api/users.js';
import { useEffect } from 'react';
import '../styles/User.scss'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
export const Users = () => {

    const [users , setUsers] = useState([]);
    
    const navigate = useNavigate()

    const HandleUsers = async() =>{

        try {

            const data = await getAllUsers();
           
            console.log(data)
            setUsers(data);
            
        } catch (error) {
            console.log(error)
        }
    }


const handleDelete = async (id) => {
  toast.info(
    <div>
      <p>Do you want to delete this user?</p>
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button
          onClick={async () => {
            try {
              await DeleteUser(id);

              setUsers((prev) =>
                prev.filter((user) => user.id !== id)
              );

              toast.success("User deleted successfully!");
              toast.info('')
            } catch (error) {
              toast.error("Failed to delete user");
            }
          }}
          style={{ background: "black", color: "white", padding: "5px 10px" }}
        >
          Yes
        </button>

        <button
          onClick={() => toast.dismiss()}
          style={{ padding: "5px 10px" }}
        >
          No
        </button>
      </div>
    </div>,
    { autoClose: true}
  );
};



    useEffect(()=>{

        HandleUsers()
    },[])



    const handleUpdate = (id) =>{

       
          return navigate(`/update/${id}`)
       
    }

  return (
    <div className='users'>

        <div className="button-add">
        <Link to={'/create'}><button>add</button></Link>
        </div>

        {
            users && users.length > 0 ? 
            
            users.map((userItem, index) =>{

                return (
                    <div className="container-user" key={userItem.id}>

                        <div className="left">
                            <img src={userItem.image} alt="image" />
                        </div>

                        <div className="right">
                            <div className="name">
                                 <h1>{userItem.first_name}</h1>
                                 <h2>{userItem.last_name}</h2>
                            </div>
                            
                                  
                                  <ul>
                                    <li>
                                        {userItem.contact}
                                    </li>
                                      <li>
                                        {userItem.email}
                                    </li>
                                      <li>
                                        {userItem.address}
                                    </li>
                                      <li>
                                        {userItem.social_account}
                                    </li>
                                  </ul>

                                  <div className="button">
                                    <button className="delete"  onClick={()=> handleDelete(userItem.id)}>Delete</button>
                                     <button className="update" onClick={()=> handleUpdate(userItem.id)}>update</button>
                                  </div>

                                  <p>{userItem.created_at}</p>
                            
                        </div>
                    </div>
                )
            })

            : <p>no data</p>
        }
    </div>
  )
}
