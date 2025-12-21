import { db } from "../config/db.js";



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


export const Deleteuser = async(req , res) =>{

    try {
        const {id} = req.params;

        const [data] = await db.query('DELETE FROM users WHERE id = ? ',[id]);

        res.status(201).json({message:"delete user  successfully"})
    } catch (error) {
         res.status(501).json({message: error.message})
    }
}


