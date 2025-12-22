import React from 'react'
import { useState } from 'react'
import { getAllUsers } from '../api/users.js';
import { useEffect } from 'react';

export const Users = () => {

    const [users , setUsers] = useState([]);
    

    const HandleUsers = async() =>{

        try {

            const data = await getAllUsers();
           
            console.log(data)
            setUsers(data);
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{

        HandleUsers()
    },[])

  return (
    <div className='users'>

        {
            users && users.length > 0 ? 
            
            users.map((userItem, index) =>{

                return (
                    <div className="container-user">

                        <div className="left">
                            <img src={userItem.image} alt="image" />
                        </div>

                        <div className="right">
                            <div className="name">
                                 <h1>{userItem.first_name}</h1>
                                 <h2>{userItem.last_name}</h2>
                            </div>
                            <div className="information">
                                  
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

                                  <p>{userItem.created_at}</p>
                            </div>
                        </div>
                    </div>
                )
            })

            : <p>no data</p>
        }
    </div>
  )
}
