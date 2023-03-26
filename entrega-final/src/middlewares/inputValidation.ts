import { Response, NextFunction } from 'express';

// Validación de campos de nuevo producto
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

// Validación de campos de edición de producto
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

// Validación de campo de texto de mensaje de chat
export const inputMsgValidator = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // chatBot es una variable booleana que me dice si el mensaje
  // fue emitido por un usuario o por el chatBot
  const { mensaje, chatBot } = req.body;

  // Elimino espacios en blanco a los extremos del campo de texto del mensaje
  const message = mensaje.trim();

  // Valido los campos ingresados

  if (!message) {
    return res.status(400).json({
      status: 'error',
      msg: 'Debe completar el campo de mensaje de chat',
    });
  }

  // Genero un objeto usuario dependiendo si es chatBot o un usuario logueado
  let usuario;
  if (chatBot)
    usuario = {
      // Guardo el dato del usuario al que chatBot le está contestando
      username: req.user.username,
      nombre: 'chatBot',
    };
  else {
    usuario = {
      // Guardo los datos del usuario que envió el mensaje desde el chat
      username: req.user.username,
      nombre: req.user.nombre,
      direccion: req.user.direccion,
      telefono: req.user.telefono,
    };
  }

  // Cargo los valores de los campos en req, para poder usarlas en el endpoint "post"
  req.msgData = {
    usuario,
    mensaje: message,
  };

  next();
};

// Validación de campos de nuevo usuario
export const inputUsrValidator = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const {
    nombre,
    direccion,
    edad,
    telefono,
    avatar,
    username,
    password,
    password2,
    admin,
  } = req.body;

  if (!username || !password || !password2 || !nombre || !direccion)
    return res
      .status(400)
      .json({ status: 'error', msg: 'Complete todos los campos obligatorios' });

  if (password !== password2)
    return res
      .status(400)
      .json({ status: 'error', msg: 'Las contraseñas no coinciden' });

  req.user = {
    nombre,
    direccion,
    edad: edad < 0 || !edad ? 0 : edad,
    telefono,
    avatar,
    username,
    password,
    password2,
    admin,
  };
  next();
};
