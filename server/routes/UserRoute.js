
import express from 'express';
import { allUser, createUser, Deleteuser, SingleUser, UpdateUser } from '../controller/UserController.js';


const router = express.Router();

router.get('/users',allUser);
router.get('/users/:id', SingleUser);
router.post('/create',createUser)
router.put('/users/:id',UpdateUser);
router.delete('/users/:id',Deleteuser)

export default router