import React from 'react'
import { useState } from 'react';
import '../styles/Create.scss'
import { createUsers } from '../api/users';
import { useNavigate } from 'react-router-dom';
export const Create = () => {

    const [formData, setFormData] = useState({
  first_name: "",
  last_name: "",
  email: "",
  contact: "",
  address: "",
  image: null,
  social_account: "",
});


  const navigate = useNavigate()

const handleChange = (e) => {
  const { name, value, files } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: files ? files[0] : value,
  }));
};


  const handleSubmit = async(e) => {
    e.preventDefault();


      const data = new FormData();
  data.append("first_name", formData.first_name);
  data.append("last_name", formData.last_name);
  data.append("email", formData.email);
  data.append("contact", formData.contact);
  data.append("address", formData.address);
  data.append("image", formData.image);
  data.append("social_account", formData.social_account);
    
    try {
        await createUsers(data);
         navigate('/')
    } catch (error) {
        console.log(error)
    }
     
    console.log(formData);
  };

  return (
    <div className="create-user">
      <div className="card">
        <h1>Create User</h1>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />

          <input
            type="file"
            name="image"
            accept='image/*'
            placeholder="Image (john.png)"
            onChange={handleChange}
          />

          <input
            type="url"
            name="social_account"
            placeholder="LinkedIn Profile"
            onChange={handleChange}
          />

          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
}
