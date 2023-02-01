import { Router, Request, Response } from 'express';

// Importo interfaz de usuario y controlador para operaciones CRUD con usuarios
import { Usuario } from '../interfaces';
import usrInstance from '../controller/users';

// Importo middleware de autenticación de usuario autorizado
import auth from '../middlewares/auth';

// Importo función para saber si se ingresa un ObjectId válido
import { isValidObjectId } from '../utils/tools';

const router = Router();

// Recibe un id y actualiza un usuario, en caso de existir
// Endpoint: /api/usuarios/:id Método: PUT
router.put('/:id', auth, async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      // Mando al controller toda la data válida que llega desde el middleware
      const user = await usrInstance.update(id, req.body);

      res.json(user);
    } else {
      res.status(500).json({
        msg: 'El id proporcionado no es un ObjectId válido para MongoDB',
      });
    }
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
