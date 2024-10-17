import { User } from "../models/User.Model.js";
import { Party } from "../models/Partys.Model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import "dotenv/config";
const CRYPTO_KEY = process.env.CRYPTO_KEY;
import nodemailer from "nodemailer";



const getPartys = async (req, res, next) => {
    console.log('entro');
    
  try {
    const partys = await Party.find();
    return res.status(200).json(partys);
  } catch (error) {
    return next(error);
  }
};



export {  
  getPartys
};
