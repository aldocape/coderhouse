"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputMsgValidator = void 0;
// En este caso, a la variable 'req' no le puedo poner que es de tipo 'Request'
// porque al final la edito cargándole la data que necesita para el siguiente middleware
const inputMsgValidator = (req, res, next) => {
    // Elimino espacios en blanco a los extremos de los campos de texto
    // const msg:Mensaje;
    // msg.author.email = req.body.email.trim();
    // msg.author.nombre = faker.name.firstName();
    const text = req.body.text.trim();
    const email = req.body.email.trim();
    // Valido los campos ingresados
    if (!email || !text) {
        return res.status(400).json({
            success: false,
            msg: 'Alguno de los campos quedó sin completar, vuelva a ingresar los datos completos en el formulario',
        });
    }
    // Cargo los valores de los campos en req, para poder usarlas en el endpoint "post"
    req.msgData = {
        email,
        text,
    };
    next();
};
exports.inputMsgValidator = inputMsgValidator;
