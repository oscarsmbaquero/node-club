import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { isAuth } from '../../authentication/jwt.js';
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';

import { loginUser, logoutUser, registerUser, OrderClient,getUsers, getUserById, editUser, resetPassword,
    getUserByMail, changePassword, saveSettings } from '../controllers/user.controller.js';

 const userRoutes = express.Router();

 userRoutes.put('/settings/:id', saveSettings);
 userRoutes.post('/login/',loginUser);
 userRoutes.post('/register/',registerUser);
 userRoutes.post('/logout/',logoutUser);
 userRoutes.get('/:userId',OrderClient);
 userRoutes.get('/',getUsers);
 userRoutes.get('/:id',getUserById);
 userRoutes.get('/mail/:email',getUserByMail);
 userRoutes.put("/modify/:id", editUser);
 userRoutes.post("/reset-password/:email",resetPassword);
 userRoutes.post("/changePassword/:id",changePassword);
 
 


export { userRoutes };