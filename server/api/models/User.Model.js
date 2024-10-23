import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user: { type: String, required: true },   
    mail:{ type:String, required: true}, 
    password: { type: String, required: true },    
    // tlf:{ type:String, required: false},
    rol:{ type:String, required: false},
    // address:{ type:String, required: false},
    // localidad: { type:String, required: false},
    // cp:{ type:String, required: false},
    // provincia:{ type:String, required: false},
    // theme:{ type:String, required: false},
    // language:{ type:String, required: false},
    //numeroPedido: { type: Object, required: false },
    // numeroPedido: [{ type: mongoose.Types.ObjectId, ref: 'Ventas', required:false }]

    //numeroPedido:  { type: mongoose.Types.ObjectId, ref:'Products', required: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User',userSchema );

export { User }