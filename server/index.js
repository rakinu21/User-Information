import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testDb } from './config/db.js';

dotenv.config()
const app = express();





const PORT = process.env.PORT || 5000;


app.listen(PORT, async()=>{
    
    await testDb()
    console.log('server running')
})