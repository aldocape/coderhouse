"use strict";

var mongoose = require('mongoose');
// import mongoose from 'mongoose';

var usuariosCollection = 'usuarios';
var UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    max: 100
  },
  apellido: {
    type: String,
    require: true,
    max: 100
  },
  dni: {
    type: String,
    require: true,
    max: 10
  }
}, {
  timestamps: true
});
UsuarioModel = mongoose.model(usuariosCollection, UsuarioSchema);
module.exports = {
  UsuarioModel: UsuarioModel
};