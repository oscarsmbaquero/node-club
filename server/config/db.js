//IMPORTAMOS LAS DEPENDENCIAS
import mongoose from "mongoose";
import 'dotenv/config';


const DB_URL = process.env.DB_URL;

//Creamos la función que conecta nuestro server con Mongo
const connect = async () => {
  try {
    const DB = await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //Con destructuring le sacamos el name y el host para poder verlo en el log
    const { name, host } = DB.connection;
    console.log(`Connected to database ${name} in host: ${host}`);
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

//Exportamos la función connect para poder usarla en el index.js
export { DB_URL, connect}
