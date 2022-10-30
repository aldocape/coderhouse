const { Router } = require('express');
const messagesObj = require('../controller/messages');
const formatMessage = require('../utils/messages');

const router = Router();

const middlewareValidator = (req, res, next) => {
  // Elimino espacios en blanco a los extremos de los campos de texto
  const userEmail = req.body.userEmail.trim();
  const userMessage = req.body.userMessage.trim();

  if (!userEmail || !userMessage) {
    return res.status(400).json({
      success: false,
      msg: 'Alguno de los campos quedó sin completar, vuelva a ingresar los datos completos en el form',
    });
  }

  // Cargo las variables en req, para poder usarlas en el endpoint "post"
  req.userEmail = userEmail;
  req.userMessage = userMessage;
  req.success = true;

  next();
};

router.post('/', middlewareValidator, (req, res) => {
  const { userEmail, userMessage, success } = req;

  // Armo un objeto nuevo, con los campos que trae el middleware
  // y luego los mando a la función formatMessage para usar la librería 'moment' y mostrar
  // la fecha y hora en el formato indicado (DD/MM/YYYY hh:mm:ss)
  const newMessage = formatMessage(userEmail, userMessage);

  // Devuelvo el nuevo mensaje de chat en formato json para mostrarlo en el front
  messagesObj.save(newMessage).then((msg) => {
    msg.success = success;
    res.json(msg);
  });
});

router.get('/', (req, res) => {
  // Traigo todos los mensajes del archivo y los mando en json al front para mostrarlos
  messagesObj.getAll().then((messages) => {
    res.json(messages);
    // res.render('main', { messages }); Esta función da un error, no la puedo utilizar aquí
  });
});

module.exports = router;
