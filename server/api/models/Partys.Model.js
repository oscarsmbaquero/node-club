import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const partySchema = new Schema(
  {
    nombre: { type: String, required: true },    
    descripcion: { type: String, required: true },
    date: { type: Date, required: false },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Party = mongoose.model('Party',partySchema );

export { Party }