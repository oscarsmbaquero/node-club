import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { isAuth } from '../../authentication/jwt.js';
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';

import { getPartys, addParty } from '../controllers/party.controller.js';

 const partysRoutes = express.Router();

 
 partysRoutes.get('/', getPartys);
 partysRoutes.post('/addParty',[ upload.single('image'), uploadToCloudinary],addParty); 
 
 
 


export { partysRoutes };