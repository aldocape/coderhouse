import { Router, Request, Response, NextFunction } from 'express';
import { Mensaje } from '../interfaces';
import moment from 'moment';
import msgInstance from '../controller/messages';
// import auth from '../middlewares/auth';
// import { middlewareValidator } from '../middlewares/inputValidation';

const router = Router();

// Recibe y agrega un mensaje, y lo devuelve con su id asignado
// Endpoint: /api/mensajes Método: POST
router.post('/', async (req: any, res: Response) => {
  const { user, text } = req.body;

  if (!text) {
    res.json({
      msg: 'Complete el campo "Texto del mensaje"',
      newMsg: {
        success: false,
      },
    });
  } else {
    const msg: Mensaje = {
      time: moment().format('DD/MM/YYYY hh:mm:ss'),
      user,
      text,
    };

    const newMsg = await msgInstance.add(msg);

    if (newMsg) {
      res.status(201).json({
        msg: 'Mensaje creado con éxito',
        newMsg,
      });
    } else {
      res.json({
        msg: 'Hubo un error al cargar el mensaje',
        newMsg,
      });
    }
  }
});

// Recibe un id y actualiza un producto, en caso de existir
// Endpoint: /api/productos/:id Método: PUT
// router.put('/:id', auth, async (req, res) => {
//   const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

//   const modifiedProduct: Producto = {
//     id: req.params.id,
//     timestamp: moment().format('DD/MM/YYYY hh:mm:ss'),
//     nombre,
//     descripcion,
//     codigo,
//     foto,
//     precio,
//     stock,
//   };

//   const prod = await prodInstance.update(modifiedProduct);

//   if (prod.success)
//     res.json({
//       msg: `El producto con id ${req.params.id} fue modificado con éxito`,
//       producto: prod.item,
//     });
//   else {
//     res.json(prod);
//   }
// });

// Devuelvo todos los mensajes
// Endpoint: /api/mensajes/ Método: GET
router.get('/', async (req, res) => {
  // Traigo todos los mensajes y los devuelvo en un json
  const messages = await msgInstance.getAll();

  if (messages.success) {
    res.json(messages.messages);
  } else {
    res.status(400).json({
      msg: messages.msg,
    });
  }
});

// Devuelvo un producto según su id
// Endpoint: /api/productos/:id Método: GET
// router.get('/:id', async (req, res) => {
//   const id = req.params.id;

//   const result = await prodInstance.getById(id);

//   if (result.success) {
//     res.json(result);
//   } else res.status(401).json(result);
// });

// // Elimina un producto según su id
// // Endpoint: /api/productos/:id Método: DELETE
// router.delete('/:id', auth, async (req, res) => {
//   const result = await prodInstance.deleteById(req.params.id);

//   if (result.success)
//     res.json({
//       msg: `El producto con id ${req.params.id} ha sido eliminado`,
//     });
//   else res.json(result);
// });

export default router;
