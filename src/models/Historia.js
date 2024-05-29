const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    Nombre_Libro: { type: String, required: true },
    Sinopsis: { type: String, required: true },
    Autor: { type: String, required: true },
    Paginas: { type: Number, required: true },
    Año: { type: Number, required: true },
    Editorial: { type: String, required: true },
    Cantidad: { type: Number, required: true }
});

module.exports = mongoose.model('Historia', bookSchema);