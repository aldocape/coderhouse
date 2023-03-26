import {
  newOrder,
  getOrders,
  updateOrder,
  getOrderById,
} from '../services/orders.services';
import { getCartById, updateCart } from '../services/carts.services';

import { Router, Request, Response } from 'express';
import { Estado, Orden } from '../interfaces';

import config from '../config';

import { EmailService } from '../services/email.services';

const router = Router();

export const saveOrderController = async (req: any, res: Response) => {
  const { cartId, userId } = req.body;

  try {
    const cart = await getCartById(cartId);
    if (cart) {
      const orden: any = {
        userId,
        estado: Estado.Generada,
      };

      let orderItems = [];
      for (let i = 0; i < cart.productos.length; i++) {
        orderItems.push({
          prodId: cart.productos[i].prodId._id,
          cantidad: cart.productos[i].cantidad,
          precio: cart.productos[i].prodId.precio,
        });
      }

      const carrito: any = {
        productos: [],
        direccion_entrega: cart.direccion_entrega,
      };

      // Actualizo el carrito en la BD quitando los productos
      const updatedCart = await updateCart(cartId, carrito);

      orden.items = orderItems;
      const order = await newOrder(orden);

      res.status(201).json({
        status: 'ok',
        msg: 'Orden de compra generada exitosamente! Muchas gracias por su compra!',
        order,
        updatedCart,
      });
    } else {
      res.status(400).json({
        status: 'error',
        msg: 'El carrito seleccionado no existe',
      });
    }
  } catch (err: any) {
    res.status(500).json({
      msg: err.message,
    });
  }
};

export const getOrderController = async (req: any, res: Response) => {
  try {
    const orders = await getOrders({ userId: req.user._id });
    if (orders)
      res.json({
        orders,
      });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const completeOrderController = async (req: any, res: Response) => {
  try {
    const { orderId } = req.body;
    if (orderId) {
      const order: any = {
        estado: Estado.Finalizada,
      };
      const modifiedOrder = await updateOrder(orderId, order);
      res.json({
        modifiedOrder,
      });
    } else {
      res.status(400).json({
        status: 'error',
        msg: 'Falta el argumento ordenId, o la orden no existe en la base de datos',
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
