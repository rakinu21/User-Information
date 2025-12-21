
import express from 'express';
import { allUser, createUser, Deleteuser, SingleUser, UpdateUser } from '../controller/UserController.js';
import upload from '../middleware/Upload.js';

const router = express.Router();

router.get('/users',allUser);
router.get('/users/:id', SingleUser);
router.post('/create', upload.single('image'), createUser);
router.put('/users/:id',UpdateUser);
router.delete('/users/:id',Deleteuser)

export default router


