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

const addParty = async (req, res, next) => {

  try {
    const NewGasto = new Party({
      nombre: req.body.name,
      descripcion: req.body.description,    
      fecha: req.body.fecha,
      image: req.file_url,

      //tipo:req.body.tipo,
    });
    //console.log(NewGasto,'new');
    const newGastoDB = await NewGasto.save();
    return res.json({
      status: 201,
      message: httpStatusCode[201],
      data: { gastos: newGastoDB },
    });
  } catch (error) {
    return next(error);
  }
};



export { getPartys, addParty };
