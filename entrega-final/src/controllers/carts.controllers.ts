import {
  saveCart,
  getCartById,
  deleteCartById,
  updateCart,
} from '../services/carts.services';

import { getProductById } from '../services/products.services';

import { Router, Request, Response } from 'express';
import { Carrito } from '../interfaces';

// import config from '../config';

// import { EmailService } from '../services/email';
// import { sendMSG } from './twilio.controller';

const router = Router();

// Importo función para saber si se ingresa un ObjectId válido
import { ObjectId, isValidObjectId } from '../utils/tools';

export const saveCartController = async (req: any, res: Response) => {
  const productsCart = req.body.productos;

  try {
    // Al array de products no le pongo tipo Producto porque sólo tiene los ObjectID
    let products: [any?] = [];

    let html = '<p>';
    // let msgWSP = `Nuevo pedido de ${req.user.nombre}, E-mail: ${req.user.username}\n\n`;

    // Verifico si tengo un prodId que viene por body, creo un array con ese elemento, sino el array queda vacío
    if (productsCart) {
      for (let i = 0; i < productsCart.length; i++) {
        const prod = productsCart[i];
        products.push(prod);

        // Luego de guardar el id de producto y la cantidad en el array para la BD,
        // me aseguro de guardar también el nombre y la cantidad para el mail
        html += `${prod.nombre} - Cantidad: ${prod.cantidad}<br />`;
        // msgWSP += `${prod.nombre} - Cantidad: ${prod.cantidad}\n`;
      }
      html += '</p>';
    }

    const cart: Carrito = {
      productos: products,
      direccion_entrega: req.body.direccion_entrega,
    };

    // Guardo carrito en la BD
    const newCart = await saveCart(cart);

    if (newCart) {
      // Quitar estas líneas cuando vuelva a habilitar envío de mail
      res.status(201).json({
        msg: 'Carrito creado con éxito',
        newCart,
      });
      // Usuario creó un nuevo carrito, envío mail al administrador
      // const destination = config.GMAIL_EMAIL;
      // const subject = `Nuevo pedido de ${req.user.nombre}, E-mail: ${req.user.username}`;
      // const msgWhatsApp = sendMSG(
      //   msgWSP,
      //   'whatsapp:+' + config.ADMIN_CEL,
      //   'https://cadenaser.com/resizer/c09Az9WzwQFwSZPN90pP1dhNqQ8=/736x552/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/TOLWBLP2DRFWZPVWKRWIQ4WH3I.jpg'
      // );
      // Esta parte está comentada porque funciona únicamente si está validado el número de teléfono en twilio
      // const sms = sendMSG(
      //   'Su pedido ha sido recibido y en este momento se encuentra en proceso.\nGracias por su confianza en nosotros.',
      //   req.user.telefono
      // );
      // Armo el mail cuyo cuerpo es la variable html con los datos del carrito
      // EmailService.sendEmail(destination, subject, html).then((response) => {
      //   // Una vez enviado el mail, respondo que el carrito fue creado con status 201
      //   res.status(201).json({
      //     msg: 'Carrito creado con éxito',
      //     newCart,
      //   });
      // });
    } else {
      res.json({
        msg: 'Hubo un error al cargar el carrito',
        newCart,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const getCartController = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    // Verifico que el objectId sea correcto
    if (isValidObjectId(id)) {
      const cart = await getCartById(id);

      if (cart) {
        res.json({
          success: true,
          cart,
        });
      } else
        res.status(204).json({
          success: false,
          msg: 'No se ha encontrado un carrito con el id enviado',
        });
    } else {
      res.json({
        success: false,
        msg: 'El id proporcionado no es un ObjectId válido para MongoDB',
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const deleteCartController = async (req: Request, res: Response) => {
  try {
    const result = await deleteCartById(req.params.id);

    if (result)
      res.json({
        msg: `El carrito con id "${req.params.id}" ha sido eliminado`,
      });
    else res.json(result);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const addProdCartController = async (req: Request, res: Response) => {
  const productos: [any] = req.body.productos;

  try {
    // Busco el carrito en la DB
    const productsCart = await getCartById(req.params.id);

    if (!productsCart || productsCart.error) {
      res.status(400).json({
        msg: `No existe el carrito con id: ${req.params.id}`,
      });
    } else {
      // Verifico que existe la propiedad 'productos' en el objeto que recibo
      if (productsCart.productos) {
        // Creo una variable auxiliar 'array' para poder 'pushear'
        // porque si lo hago directamente con la propiedad 'productos', TypeScript marca un error
        const array: [any?] = productsCart.productos;

        // Recorro el array de productos que viene desde el front
        for (let i = 0; i < productos.length; i++) {
          // Busco el producto en la DB
          const prodId = productos[i].prodId;
          const product = await getProductById(prodId);

          if (!product) {
            res.status(400).json({
              msg: `No existe el producto con id: ${prodId}`,
            });
          }
          // Si existe el carrito y el producto, agrego el producto
          // al array de productos del carrito (verificando primero si existe, en cuyo caso sólo aumento la cantidad)
          else {
            let insertItem = true;

            for (let j = 0; j < productsCart.productos.length; j++) {
              if (
                productsCart.productos[j].prodId._id.equals(productos[i].prodId)
              ) {
                array[j].cantidad += productos[i].cantidad;
                insertItem = false;
              }
            }

            if (insertItem) array.push(productos[i]);
          }
        }

        const carrito = {
          productos: array,
          direccion_entrega: req.body.direccion_entrega,
        };
        // Actualizo con el nuevo carrito en la base de datos
        const updatedCart = await updateCart(req.params.id, carrito);
        res.json(updatedCart);
      } else {
        res.status(400).json({
          msg: 'Hubo un error al intentar actualizar el carrito',
        });
      }
    }
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteProductCartController = async (
  req: Request,
  res: Response
) => {
  try {
    //Obtengo el carrito desde la DB
    const productsCart = await getCartById(req.params.id);

    // Si el carrito no existe en la DB, mando un error
    if (!productsCart || productsCart.error) {
      res.status(400).json({
        msg: 'No existe ningún carrito con el id proporcionado',
      });
    } else {
      // Si el carrito existe, busco el producto
      let index = -1;

      for (let i = 0; i < productsCart.productos.length; i++) {
        if (productsCart.productos[i].prodId.equals(req.params.id_prod))
          index = i;
      }

      // Si index = -1, el producto con ese id no existe en el carrito, devuelvo un error
      if (index == -1) {
        res.status(400).json({
          msg: 'El id de producto seleccionado no existe en el carrito',
        });
      } else {
        // Si el producto buscado existe, lo elimino en el array de productos con el método 'splice'
        // Creo una variable auxiliar 'array' para poder eliminar
        // porque si lo hago directamente con la propiedad 'productos', TypeScript marca un error
        const array: [any?] = productsCart.productos;
        array.splice(index, 1);

        const carrito = {
          productos: array,
          direccion_entrega: productsCart.direccion_entrega,
        };

        // Actualizo el carrito en la BD
        const updatedCart = await updateCart(req.params.id, carrito);

        // Si salió todo bien muestro carrito actualizado, sino muestro un error
        if (updatedCart) {
          res.json(updatedCart);
        } else {
          res.status(400).json({
            msg: 'Hubo un error al intentar actualizar el carrito',
          });
        }
      }
    }
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};
