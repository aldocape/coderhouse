"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsuarioModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// const mongoose = require('mongoose');

var usuariosCollection = 'usuarios';
var UsuarioSchema = new _mongoose["default"].Schema({
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
var UsuarioModel = _mongoose["default"].model(usuariosCollection, UsuarioSchema);

// module.exports = { UsuarioModel };
exports.UsuarioModel = UsuarioModel;