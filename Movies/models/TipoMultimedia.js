const { Schema, model } = require('mongoose')

const TipoMultimediaSchema = new Schema({
    nombre: { type: String, require: true },
    fechaCreacion: { type: Date, require: true},
    fechaActualizacion: { type: Date, require: true },
    descripcion: { type: String, require: true },
  });


  module.exports = model('TipoMultimedia', TipoMultimediaSchema);