"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayRandom = void 0;
const arrayRandom = (cant = 100000000) => {
    //Devuelve un numero aleatorio entre 2 numeros pasados por parametros
    //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    const between = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };
    const salida = {};
    for (let i = 0; i < 1000; i++) {
        const valor = between(0, cant);
        // Se genera como clave (índice) del array el número random
        if (salida[valor])
            salida[valor] = salida[valor] + 1;
        else
            salida[valor] = 1;
    }
};
exports.arrayRandom = arrayRandom;
