"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesObj = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Clase para manejo de carga de datos en archivos usando la librería filesystem
/*
  Los métodos de la clase pueden devolver los siguientes valores

  success: Devuelve true o false, dependiendo si pudo o no realizar con éxito la operación
  msg: Mensaje explicativo del resultado obtenido
  item: Devuelve el o los objetos solicitados
*/
class Files {
    constructor(archivo) {
        this.archivo = archivo;
    }
    saveItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.resolve(__dirname, this.archivo);
            try {
                // Intento leer el archivo cuyo nombre pasé al constructor
                const content = yield fs_1.default.promises.readFile(filePath, 'utf8');
                // Si salió todo bien, es decir, no se va al catch, entonces almaceno los datos como objeto
                const itemsList = JSON.parse(content);
                // Agrego al array el nuevo item
                itemsList.push(item);
                try {
                    // Intento escribir en el archivo, con los nuevos datos
                    yield fs_1.default.promises.writeFile(filePath, JSON.stringify(itemsList, null, 2));
                    // Devuelvo el item nuevo y un booleano que indica que salió todo bien
                    return {
                        item,
                        success: true,
                    };
                }
                catch (err) {
                    // Si hubo un error al escribir, lo devuelvo
                    return {
                        success: false,
                        msg: err.message,
                    };
                }
            }
            catch (err) {
                // Este catch viene desde el primer try, significa que si entró aquí,
                // o bien no existe el archivo, o bien tiene algún error al leerlo
                // Para el caso que no exista, lo verifico con el código 'ENOENT'
                if (err.code === 'ENOENT') {
                    try {
                        // El archivo no existe, significa que es el primer mensaje
                        // Guardo en un array el mensaje, y lo escribo en el archivo
                        yield fs_1.default.promises.writeFile(filePath, JSON.stringify([item], null, 2));
                        // Devuelvo el item ingresado y un booleano que indica que salió todo bien
                        return {
                            item,
                            success: true,
                        };
                    }
                    catch (err) {
                        // Si hubo un error al escribir en el archivo, lo devuelvo para usar en la API
                        return {
                            success: false,
                            msg: err.message,
                        };
                    }
                }
                else {
                    // Devuelvo para mostrar en api si llega a haber algún error distinto al 'ENOENT'
                    return {
                        success: false,
                        msg: err.message,
                    };
                }
            }
        });
    }
    // Método para obtener todos los mensajes
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Intento leer el archivo
                const filePath = path_1.default.resolve(__dirname, this.archivo);
                const content = yield fs_1.default.promises.readFile(filePath, 'utf8');
                // Transformo la data que llegó en un array de objetos
                const items = JSON.parse(content);
                // Devuelvo el array de objetos
                return {
                    success: true,
                    items,
                };
            }
            catch (err) {
                // Si hubo un error al leer, devuelvo ese error
                return {
                    success: false,
                    msg: err.message,
                };
            }
        });
    }
}
// Usaremos el archivo 'messages.json' ubicado en la raíz del proyecto para guardar los mensajes
const messagesObj = new Files('../../messages.json');
exports.messagesObj = messagesObj;
