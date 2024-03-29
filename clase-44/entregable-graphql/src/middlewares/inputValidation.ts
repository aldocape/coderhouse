import { Request, Response, NextFunction } from 'express';

export const middlewareValidatorInsert = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.nombre || !req.body.codigo || !req.body.precio)
    return res.status(400).json({
      msg: 'Recuerde completar todos los campos obligatorios',
    });

  // Elimino espacios en blanco a los extremos de los campos de texto
  // y en el caso del precio, lo convierto a 'float' para poder cargar números con decimales

  const nombre = req.body.nombre.trim();
  const codigo = req.body.codigo.trim();
  const precio = parseFloat(req.body.precio);

  if (!nombre || !codigo)
    return res.status(400).json({
      success: false,
      msg: 'Recuerde completar todos los campos obligatorios',
    });

  let foto: string = '';
  if (req.body.foto) foto = req.body.foto.trim();

  let stock: number = req.body.stock;
  if (!stock || isNaN(stock)) stock = 0;

  let descripcion: string = '';
  if (req.body.descripcion) descripcion = req.body.descripcion;

  // Valido que precio sea un número
  if (isNaN(precio)) {
    return res.status(400).json({
      success: false,
      msg: "El tipo de dato ingresado en el campo 'Precio' es inválido, por favor ingrese un número con o sin decimales",
    });
  }

  // Cargo los valores de los campos en req, para poder usarlas en el endpoint "post"

  req.productData = {
    nombre,
    codigo,
    descripcion,
    precio,
    foto,
    stock,
  };

  next();
};

export const middlewareValidatorUpdate = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // Creo un objeto auxiliar 'product' para ir guardando allí los valores que me lleguen por body
  const product: any = {};

  if (req.body.nombre) product.nombre = req.body.nombre.trim();
  if (req.body.codigo) product.codigo = req.body.codigo.trim();
  if (req.body.descripcion) product.descripcion = req.body.descripcion.trim();

  if (req.body.precio)
    if (isNaN(req.body.precio)) {
      // Valido que precio sea un número
      return res.status(400).json({
        success: false,
        msg: "El tipo de dato ingresado en el campo 'Precio' es inválido, por favor ingrese un número con o sin decimales",
      });
    } else {
      product.precio = parseFloat(req.body.precio);
    }

  if (req.body.foto) product.foto = req.body.foto.trim();

  if (req.body.stock)
    if (isNaN(req.body.stock)) product.stock = 0;
    else product.stock = req.body.stock;

  // Guardo el objeto en req.productData para poder usarlo en el endpoint 'PUT' de productos
  req.productData = product;

  next();
};

export const inputMsgValidator = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // Elimino espacios en blanco a los extremos de los campos de texto

  const author = req.body.author;

  const email = author.email.trim();
  const text = req.body.text.trim();

  // Valido los campos ingresados

  if (!email || !text) {
    return res.status(400).json({
      success: false,
      msg: 'Alguno de los campos quedó sin completar, vuelva a ingresar los datos completos en el formulario',
    });
  }

  req.body.author.email = email;

  // Cargo los valores de los campos en req, para poder usarlas en el endpoint "post"

  req.msgData = {
    author: req.body.author,
    text,
  };

  next();
};
