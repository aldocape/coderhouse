"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductsDTO {
    constructor(data, esMongo) {
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.foto = data.foto;
        this.precioARS = data.precio;
        this.precioUSD = (data.precio / 397).toFixed(2);
        this.hasStock = data.stock > 0;
        this.stock = data.stock;
        if (esMongo)
            this.id = data._id || '';
        else
            this.id = data.id;
    }
}
exports.default = ProductsDTO;
