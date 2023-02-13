import {
  saveCart,
  getCartById,
  deleteCartById,
  updateCart,
} from '../services/carts.services';

import { getProductById } from '../services/products.services';

import { Router, Request, Response } from 'express';
import { Carrito } from '../interfaces';

import config from '../config';

import { EmailService } from '../services/email';
import { sendMSG } from './twilio.controller';

const router = Router();

// Importo función para saber si se ingresa un ObjectId válido
import { ObjectId, isValidObjectId } from '../utils/tools';

export const saveCartController = async (req: any, res: Response) => {
  const productsCart = req.body;

  try {
    // Al array de products no le pongo tipo Producto porque sólo tiene los ObjectID
    let products: [any?] = [];

    let html = '<p>';
    let msgWSP = `Nuevo pedido de ${req.user.nombre}, E-mail: ${req.user.username}\n\n`;

    // Verifico si tengo un prodId que viene por body, creo un array con ese elemento, sino el array queda vacío
    if (productsCart) {
      for (let i = 0; i < productsCart.length; i++) {
        const prod = productsCart[i];
        for (let j = 0; j < prod.cantidad; j++) {
          // const item = new ObjectId(prod.id);
          const item = prod.id;
          products.push(item);
        }
        // Luego de guardar el id del producto en el array para la BD,
        // me aseguro de guardar también el nombre y la cantidad para el mail
        html += `${prod.nombre} - Cantidad: ${prod.cantidad}<br />`;
        msgWSP += `${prod.nombre} - Cantidad: ${prod.cantidad}\n`;
      }
      html += '</p>';
    }

    const cart: Carrito = {
      productos: products,
    };

    // Guardo carrito en la BD
    const newCart = await saveCart(cart);

    if (newCart) {
      // Usuario creó un nuevo carrito, envío mail al administrador

      const destination = config.GMAIL_EMAIL;
      const subject = `Nuevo pedido de ${req.user.nombre}, E-mail: ${req.user.username}`;

      const msgWhatsApp = sendMSG(
        msgWSP,
        'whatsapp:+' + config.ADMIN_CEL,
        'https://cadenaser.com/resizer/c09Az9WzwQFwSZPN90pP1dhNqQ8=/736x552/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/TOLWBLP2DRFWZPVWKRWIQ4WH3I.jpg'
      );

      // Esta parte está comentada porque funciona únicamente si está validado el número de teléfono en twilio
      // const sms = sendMSG(
      //   'Su pedido ha sido recibido y en este momento se encuentra en proceso.\nGracias por su confianza en nosotros.',
      //   req.user.telefono
      // );

      // Armo el mail cuyo cuerpo es la variable html con los datos del carrito
      EmailService.sendEmail(destination, subject, html).then((response) => {
        // Una vez enviado el mail, respondo que el carrito fue creado con status 201
        res.status(201).json({
          msg: 'Carrito creado con éxito',
          newCart,
        });
      });
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
  const { prodId } = req.body;

  try {
    // Busco el producto en la DB
    const product = await getProductById(prodId);
    if (!product) {
      res.status(400).json({
        msg: `No existe el producto con id: ${prodId}`,
      });
    } else {
      // Busco el carrito en la DB
      const productsCart = await getCartById(req.params.id);
      if (!productsCart) {
        res.status(400).json({
          msg: `No existe el carrito con id: ${req.params.id}`,
        });
      } else {
        const idProd = new ObjectId(prodId);
        // Si existe el carrito y el producto, agrego el producto al array de productos del carrito
        // Verifico también que existe la propiedad 'productos' en el objeto que recibo
        if (productsCart.productos) {
          // Creo una variable auxiliar 'array' para poder 'pushear'
          // porque si lo hago directamente con la propiedad 'productos', TypeScript marca un error
          const array: [any?] = productsCart.productos;
          array.push(idProd);
          const carrito = {
            productos: array,
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
    if (!productsCart) {
      res.status(400).json({
        msg: 'No existe ningún carrito con el id proporcionado',
      });
    } else {
      // Si el carrito existe, busco el producto
      // const id = new ObjectId(req.params.id_prod);
      const index = productsCart.productos.findIndex(
        (prod: any) => prod.id == req.params.id_prod
      );

      // Si index = -1, el producto con ese id no existe, devuelvo un error
      if (index < 0) {
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
