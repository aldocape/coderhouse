"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var between = function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min + 1);
};
var Color = /*#__PURE__*/function () {
  function Color() {
    _classCallCheck(this, Color);
    this.color = {
      rojo: between(0, 255),
      verde: between(0, 255),
      azul: between(0, 255)
    };
  }
  _createClass(Color, [{
    key: "getColor",
    value: function getColor() {
      return this.color;
    }
  }]);
  return Color;
}();
var _default = Color;
exports["default"] = _default;