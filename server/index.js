import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testDb } from './config/db.js';
import router from './routes/UserRoute.js';

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());



app.use('/api/', router)




const PORT = process.env.PORT || 5000;


app.listen(PORT, async()=>{
    
    await testDb()
    console.log('server running')
})