import { Request, Response, NextFunction } from 'express';

export const middlewareValidator = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // Elimino espacios en blanco a los extremos de los campos de texto
  // y en el caso del precio, lo convierto a 'float' para poder cargar números con decimales

  const nombre = req.body.nombre.trim();
  const codigo = req.body.codigo.trim();
  const precio = parseFloat(req.body.precio);
  const foto = req.body.foto.trim();
  let stock = req.body.stock;
  if (!stock || isNaN(stock)) stock = 0;

  // Valido los campos ingresados
  if (isNaN(precio)) {
    return res.status(400).json({
      success: false,
      msg: "El tipo de dato ingresado en el campo 'Precio' es inválido, por favor ingrese un número con o sin decimales",
    });
  }
  if (!nombre || !codigo || !precio || !foto) {
    return res.status(400).json({
      success: false,
      msg: 'Alguno de los campos quedó sin completar, vuelva a ingresar los datos completos en el form',
    });
  }

  // Cargo los valores de los campos en req, para poder usarlas en el endpoint "post"

  req.productData = {
    nombre,
    codigo,
    precio,
    foto,
    stock,
  };

  next();
};
