import React, { useState } from "react";
import "../styles/Create.scss";
import { UpdateUsers } from "../api/users";
import { useNavigate, useParams } from "react-router-dom";

export const Update = () => {
  const { id } = useParams(); // ✅ get user id
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact: "",
    address: "",
    image: null,
    social_account: "",
  });



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      await UpdateUsers(id, data); // ✅ update instead of create
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-user">
      <div className="card">
        <h1>Update User</h1>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <input name="first_name" placeholder="First Name" onChange={handleChange} />
            <input name="last_name" placeholder="Last Name" onChange={handleChange} />
          </div>

          <input name="email" type="email" placeholder="Email" onChange={handleChange} />
          <input name="contact" placeholder="Contact Number" onChange={handleChange} />
          <input name="address" placeholder="Address" onChange={handleChange} />
          <input name="image" type="file" accept="image/*" onChange={handleChange} />
          <input name="social_account" placeholder="LinkedIn Profile" onChange={handleChange} />

          <button type="submit">Update User</button>
        </form>
      </div>
    </div>
  );
};
