"use strict";

var _color = _interopRequireDefault(require("./color"));
var _server = _interopRequireDefault(require("./services/server"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import sumar from './calculadora';

// const a = 24;
// const b = 55;

// console.log(`El resultado de sumar ${a} con ${b} es igual a ${sumar(a, b)}`);

var colorAleatorio = new _color["default"]();
console.log("El resultado del color aleatorio es: ".concat(JSON.stringify(colorAleatorio)));
var PORT = 8080;
_server["default"].listen(PORT, function () {
  console.log('Está todo joya en el server!!');
});