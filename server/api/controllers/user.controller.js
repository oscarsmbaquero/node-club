import { User } from "../models/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import "dotenv/config";
const CRYPTO_KEY = process.env.CRYPTO_KEY;
import nodemailer from "nodemailer";

const loginUser = async (req, res, next) => {
  try {
    const { body } = req;
    const encryptedPassword = req.body.password.toString();
    // Descifrar la contraseña
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, CRYPTO_KEY);
    const password = bytes.toString(CryptoJS.enc.Utf8);
    // Comprobar email
    const user = await User.findOne({ mail: body.user });
    // Comprobar password
    const isValidPassword = await bcrypt.compare(password, user.password);
    // Control de LOGIN
    if (!user || !isValidPassword) {
      const error = {
        status: 401,
        message: "The email & password combination is incorrect!",
      };
      return next(error);
    }
    // TOKEN JWT
    const token = jwt.sign(
      {
        id: user._id,
        user: user.user,
      },
      req.app.get("secretKey"),
      { expiresIn: "1h" }
    );

    // Response
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: {
        id: user._id,
        user: user.user,
        theme: user.theme,
        language: user.language,
        token: token,
        rol: user.rol,
      },
    });
  } catch (error) {
    //console.log(error);
    return next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    req.authority = null;
    return res.json({
      status: 200,
      message: "logged out",
      token: null,
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

const getUserActive = async (req, res, next) => {
  try {
    const users = await User.findById();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { body } = req;
    const encryptedPassword = req.body.password.toString();
    // Descifrar la contraseña
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, CRYPTO_KEY);
    const password = bytes.toString(CryptoJS.enc.Utf8);
    // Comprobar usuario
    const previousUser = await User.findOne({ mail: body.mail });
    if (previousUser) {
      const error = new Error("The user is already registered!");
      return next(error);
    }
    // Encriptar password
    const pwdHash = await bcrypt.hash(password, 10);
    // Crear usuario en DB
    const newUser = new User({
      user: body.user,
      //tlf: body.tlf,
      mail: body.mail,
      password: pwdHash,
      //address: body.address,
      //localidad: body.localidad,
      //provincia: body.provincia,
      //cp: body.cp
    });

    //envio de mail
    const config = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "oscarsmb@gmail.com",
        pass: "ewqt tsig kcdc pgjl",
      },
    };

    const mensaje = {
      from: "Why Music everywhere",
      to: newUser.mail,
      subject: `Bienvenido  ${newUser.user}`,
      html: `
         <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #000; color: #fff;">
        
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #000; max-width: 600px; margin: 0 auto;">
                <tr>
                    <td align="center" style="padding: 20px 0;">
                        <img src="https://res.cloudinary.com/dcfk8yjwr/image/upload/c_scale,w_110/v1727688473/why_light_1_y9ct0v.png" alt="WhyLogo" style="display: block; margin: 0 auto">
                    </td>
                </tr>
        
                <tr>
                    <td align="center" style="padding: 20px;">
                        <img src="https://res.cloudinary.com/dcfk8yjwr/image/upload/v1727688495/foto-foco_t8xfr0.jpg" alt="Modelo 1" style="max-width: 200px; display: inline-block; margin-right: 10px;">
                    </td>
                </tr>        
                <tr>
                    <td style="padding: 20px; text-align: left; color: #fff;">
                        <p>Hola <strong>${newUser.user}</strong>,</p>
                        <p>Te damos la bienvenida a <span style="color: #D9FF00;">Why Not Music Everyehere</span>.</p>
                        <p>
                            Ser parte de nuestra comunidad no solo se basa en compartir una misma filosofía de vida.
                            Ser parte de nuestra red implica tener acceso a la libertad, la inconformismo, y la prevención.
                        </p>
        
                        <ul style="list-style-type: none; padding: 0; color: #D9FF00;">
                            <li>✔️ Tener acceso a promociones</li>
                            <li>✔️ Acceder a descuentos</li>
                        </ul>        
                        <p style="color: #fff;">Como regalo de bienvenida, tu próxima compra tiene un 10% de descuento con el código: <strong style="color: #D9FF00;">COD-00001</strong>.</p>
                    </td>
                </tr>        
                <tr>
                    <td align="center" style="padding: 20px;">
                        <img src="https://via.placeholder.com/150x150?text=QR+Code" alt="Código QR" style="display: block; margin: 0 auto;">
                    </td>
                </tr>
        
                <tr>
                    <td align="center" style="padding: 20px;">
                        <p style="color: #ccc; font-size: 12px;">Puedes acceder a la configuración de tu perfil <a href="https://angular-e-commerce-ruby.vercel.app/client/account" style="color: #D9FF00; text-decoration: none;">AQUÍ</a></p>
                    </td>
                </tr>
        
                <tr>
                    <td align="center" style="padding: 20px;">
                        <a href="#" style="margin: 0 10px;"><img src="https://res.cloudinary.com/dcfk8yjwr/image/upload/c_scale,w_88/v1727688932/facebook_evwuo3.png" alt="Facebook" style="display: inline-block; width: 80px;"></a>
                        <a href="#" style="margin: 0 10px;"><img src="https://res.cloudinary.com/dcfk8yjwr/image/upload/c_scale,w_88/v1727688955/X_kv3x2v.png" alt="Twitter" style="display: inline-block; width: 80px;"></a>
                        <a href="#" style="margin: 0 10px;"><img src="https://res.cloudinary.com/dcfk8yjwr/image/upload/c_scale,w_88/v1727688954/instagram_eoi3gv.png" alt="Instagram" style="display: inline-block; width: 80px;"></a>
                    </td>
                </tr>
        
                <tr>
                    <td align="center" style="padding: 20px; font-size: 12px; color: #555;">
                        <p>Why not music everywhere, todos los derechos reservados.</p>
                    </td>
                </tr>
            </table>
        </body>
      `,
     };
     const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(mensaje);
    const savedUser = await newUser.save();
    // Respuesta
    return res.status(201).json({
      status: 201,
      message: httpStatusCode[201],
      data: {
        id: savedUser._id,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const OrderClient =
  ("/",
  async (req, res, next) => {
    try {
      const { userId } = req.params;

      const userById = await User.findById(userId)
        .select("-password")
        .populate([{ path: "numeroPedido", select: "" }]);
      return res.json({
        //  status : 200,
        //  message : httpStatusCode[200],
        data: { pedidos: userById },
      });
    } catch (error) {
      return next(error);
    }
  });

const getUserById = async (req, res, next) => {
  console.log("entro");
  try {
    const { id } = req.params;
    //console.log(id);
    const userById = await User.findById(id).select(
      "-password -address -localidad -tlf -cp"
    );

    console.log(userById);

    return res.status(200).json(userById);
    // return res.json({
    //     status: 200,
    //     message: httpStatusCode[200],
    //     data: { jobs: jobbyid },
    // });
    //res.send(jobbyid);
  } catch (error) {
    return next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Se asume que req.body contiene los campos que quieres actualizar.

    // Asegúrate de que no se intenta modificar el _id
    if (updates._id) {
      delete updates._id;
    }

    const userUpdated = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!userUpdated) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    return res.json({
      status: 200,
      message: "User updated successfully",
      data: { user: userUpdated },
    });
  } catch (error) {
    return next(error);
  }
};
const getUserByMail = async (req, res, next) => {
  try {
    const { email } = req.params;
    
    // Buscar usuario por correo
    const userById = await User.findOne({ mail: email });

    // Verificar si el usuario existe
    if (!userById) {
      return res.status(404).json({
        status: 404,
        message: 'Usuario no encontrado',
      });
    }

    // Verificar si el usuario tiene una propiedad mail
    if (!userById.mail) {
      return res.status(400).json({
        status: 400,
        message: 'El usuario no tiene un correo registrado',
      });
    }

    // Respuesta exitosa con el mail del usuario
    return res.status(200).json({
      status: 200,
      message: 'Usuario encontrado',
      data: { mail: userById.mail },
    });

  } catch (error) {
    console.error('Error en getUserByMail:', error); // Agregar más detalles en los errores
    return res.status(500).json({
      status: 500,
      message: 'Error interno del servidor',
      error: error.message, // Enviar el mensaje del error para más detalles
    });
  }
};


// const getUserByMail = async (req, res, next) => {
//   try {
//     const { email } = req.params;
//     const userById = await User.findOne({ mail: email });
//     return res.status(200).json(userById.mail);
//     // return res.json({
//     //     status: 200,
//     //     message: httpStatusCode[200],
//     //     data: { jobs: userById },
//     // });
//     //res.send(jobbyid);
//   } catch (error) {
//     return next(error);
//   }
// };

const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.params;
    const previousUser = await User.findOne({ mail: email });
    // console.log(previousUser, 285);
    //await sendMail(email);
    if (!previousUser) {
      return res.status(404).json({
        status: 404,
        message: "Usuario no encontrado",
      });
    }
    //const user = await User.findOne({ user: body.user });
    const token = jwt.sign(
      {
        id: previousUser._id,
        user: previousUser.user,
      },
      req.app.get("secretKey"),
      { expiresIn: "1h" }
    );
    //envio de mail
    const config = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "oscarsmb@gmail.com",
        pass: "ewqt tsig kcdc pgjl",
      },
    };
    // const mensaje = {
    //   from: "Coexist",
    //   to: email,
    //   subject: `Contraseña usuario ${previousUser.user}`,
    //   //text: `https://angular-e-commerce-ruby.vercel.app/user/new${token}`
    //   text: `Hola  ${previousUser.user}. Adjuntamos enlace para recuperar tu contraseña.
    //   Este enlace caduca en 1 hora.
    //   https://angular-e-commerce-ruby.vercel.app/user/new/${token}.
    //   Un saludo desde el equipo de Why`,
    // };
    const mensaje = {
      from: "Coexist",
      to: email,
      subject: `Contraseña usuario ${previousUser.user}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #0056b3;">Hola, ${previousUser.user}!</h2>
          <p>Has solicitado restablecer tu contraseña. Haz clic en el enlace a continuación para cambiar tu contraseña. Este enlace caduca en 1 hora:</p>
          <a href="https://angular-e-commerce-ruby.vercel.app/user/new/${token}" style="background-color: blue; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Restablecer contraseña</a>
          <p>Si no has solicitado restablecer tu contraseña, simplemente ignora este mensaje.</p>
          <br/>
          <p>Un saludo desde el equipo de <strong>Why</strong>.</p>
        </div>
      `,
    };

    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(mensaje);
    // return res.status(200).json({
    //   status: 200,
    //   message: 'Contraseña actualizada con éxito',
    // });
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      // data: { previousUser: previousUser },
    });
  } catch (error) {
    return next(error);
  }
};
const changePassword = async (req, res, next) => {
  try {
    const id = req.params.id.toString();
    const encryptedPassword = req.body.nuevaContrasena.toString();
    // Descifrar la contraseña
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, CRYPTO_KEY);
    const nuevaContrasena = bytes.toString(CryptoJS.enc.Utf8);
    // Buscar el usuario por ID
    const userById = await User.findById(id);
    if (!userById) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // Generar el hash de la nueva contraseña
    const pwdHash = await bcrypt.hash(nuevaContrasena, 10);
    // Asignar la nueva contraseña
    userById.password = pwdHash;
    // Guardar los cambios
    await userById.save();
    return res
      .status(200)
      .json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return res
      .status(500)
      .json({
        message: "Error al cambiar la contraseña",
        error: error.message,
      });
  }
};

const saveSettings = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Actualizar solo los campos proporcionados en req.body
    const userUpdated = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: { user: userUpdated },
    });
  } catch (error) {
    return next(error);
  }
};

export {
  loginUser,
  logoutUser,
  registerUser,
  OrderClient,
  getUsers,
  getUserById,
  editUser,
  getUserByMail,
  resetPassword,
  changePassword,
  saveSettings,
};
