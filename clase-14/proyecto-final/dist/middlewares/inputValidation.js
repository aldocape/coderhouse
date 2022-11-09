"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middlewareValidator = (req, res, next) => {
    // Elimino espacios en blanco a los extremos de los campos de texto
    // y en el caso del precio, lo convierto a 'float' para poder cargar números con decimales
    //   const title = req.body.title.trim();
    //   const price = parseFloat(req.body.price);
    //   const thumbnail = req.body.thumbnail.trim();
    //   // Valido los campos ingresados
    //   if (isNaN(price)) {
    //     return res.status(400).json({
    //       success: false,
    //       msg: "El tipo de dato ingresado en el campo 'Precio' es inválido, por favor ingrese un número con o sin decimales",
    //     });
    //   }
    //   if (!title || !price || !thumbnail) {
    //     return res.status(400).json({
    //       success: false,
    //       msg: 'Alguno de los campos quedó sin completar, vuelva a ingresar los datos completos en el form',
    //     });
    //   }
    // Cargo las variables en req, para poder usarlas en el endpoint "post"
    //   result.title = title;
    //   req.title = title;
    //   req.price = price;
    //   req.thumbnail = thumbnail;
    //   req.success = true;
    //   req.msg = 'El producto ingresado fue guardado correctamente';
    next();
};
