import { RecursoEnMemoria } from '../api/recursoMemoria.js';

class Recurso {
  async get(req, res) {
    const id = req.params.id;

    if (id) {
      const data = await RecursoEnMemoria.get(Number(id));
      return res.json(data);
    }

    return res.json(await RecursoEnMemoria.get());
  }

  async create(req, res) {
    const cant = req.params.cant ? Number(req.params.cant) : 50;

    for (let i = 0; i < cant; i++) {
      await RecursoEnMemoria.post();
    }

    return res.json({
      msg: 'ok',
    });
  }

  async borrar(req, res) {
    const id = Number(req.params.id);

    await RecursoEnMemoria.delete(id);
    return res.json({
      msg: 'Elemento eliminado',
    });
  }
}

export const RecursoController = new Recurso();
