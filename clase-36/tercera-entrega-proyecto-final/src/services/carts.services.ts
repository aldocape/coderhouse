import { save, getById, deleteById, update } from '../daos/daos';
import { Carrito } from '../interfaces';

export async function saveCart(cart: Carrito) {
  const newCart = await save('cart', cart);
  return newCart;
}

export async function getCartById(id: string) {
  const cart = await getById('cart', id);
  return cart;
}

export async function deleteCartById(id: string) {
  const cart = await deleteById('cart', id);
  return cart;
}

export async function updateCart(id: string, cart: Carrito) {
  const cartModified = await update('cart', id, cart);
  return cartModified;
}
