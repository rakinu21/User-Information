import { db } from "../config/db.js";
import fs from 'fs'
import path from "path";


export const allUser = async (req, res) =>{

    try {
       const [data] = await db.query('SELECT * FROM users ORDER BY created_at DESC');
    
       res.status(201).json(data)
    } catch (error) {
        console.log({message :error.message})
    }
}

export const SingleUser = async(req, res) =>{

    try {
        const {id} = req.params;

        const [data] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        res.status(201).json(data)
    } catch (error) {
        res.status(501).json({message: error.message})
    }
}

export const createUser = async (req, res) => {
  try {
    const { first_name, last_name, contact, address, email, social_account } = req.body;

    const image = req.file ? req.file.filename : null;

    const [data] = await db.query(
      `INSERT INTO users 
      (first_name, last_name, contact, address, email, social_account, image) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, contact, address, email, social_account, image]
    );

    res.status(201).json({ message: "User created", data });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const UpdateUser = async (req ,res) =>{

    try {
        const {id} = req.params;
        
        const {first_name , last_name , contact , address, email , social_account, image} = req.body;
        const [data] = await db.query(`
    UPDATE users SET
    first_name=?, last_name=?, contact=?, address=?, email=?, social_account=?, image=?
    WHERE id=?
  `,
     [first_name , last_name , contact , address, email , social_account, image , id]
        )

        res.status(201).json({message :"updated successfully"})
    } catch (error) {
        res.status(501).json({message: error.message})
    }
}


export const Deleteuser = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Get user image
    const [rows] = await db.query(
      "SELECT image FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const image = rows[0].image;

    // 2️⃣ Delete image from filesystem
    if (image) {
      const imagePath = path.join(
        process.cwd(),
        "uploads",
        "users",
        image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // 3️⃣ Delete user from DB
    await db.query("DELETE FROM users WHERE id = ?", [id]);

    res.json({ message: "User and image deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


