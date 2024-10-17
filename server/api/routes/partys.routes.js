import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { isAuth } from '../../authentication/jwt.js';
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';

import { getPartys } from '../controllers/party.controller.js';

 const partysRoutes = express.Router();

 
 partysRoutes.get('/', getPartys);
 
 
 


export { partysRoutes };