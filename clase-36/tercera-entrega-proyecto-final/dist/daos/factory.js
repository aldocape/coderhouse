"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoFactory = void 0;
const mongodb_1 = __importDefault(require("./dao-mongodb/mongodb"));
const filesystem_1 = __importDefault(require("./dao-filesystem/filesystem"));
const memory_1 = __importDefault(require("./dao-memory/memory"));
class DAO {
    constructor(inst) {
        this.instances = inst;
    }
    // Creo getters de las instancias de clases de cada recurso que obligan a tener los mismos métodos en todas las persistencias
    // De esta manera, sin importar la persistencia, tenemos handlers que manejan todos los recursos de igual manera
    productHandler() {
        return this.instances.products;
    }
    usersHandler() {
        return this.instances.users;
    }
    messagesHandler() {
        return this.instances.messages;
    }
    cartsHandler() {
        return this.instances.carts;
    }
}
class MongoDB extends DAO {
    constructor(soloMongo) {
        let instances = {};
        if (soloMongo) {
            instances = {
                products: mongodb_1.default.getInstance('product'),
                carts: mongodb_1.default.getInstance('cart'),
                messages: mongodb_1.default.getInstance('message'),
                users: mongodb_1.default.getInstance('user'),
            };
        }
        else {
            instances = {
                users: mongodb_1.default.getInstance('user'),
            };
        }
        super(instances);
    }
    static getInstance(soloMongo) {
        if (!MongoDB.instance) {
            console.log('Iniciando instancia de MongoDB en Factory');
            MongoDB.instance = new MongoDB(soloMongo);
        }
        return MongoDB.instance;
    }
}
class FileSystem extends DAO {
    constructor() {
        // No creo una instancia para manejo de usuarios porque
        // no se puede implementar usando passport local y connect-mongo
        const instances = {
            products: filesystem_1.default.getInstance('product'),
            carts: filesystem_1.default.getInstance('cart'),
            messages: filesystem_1.default.getInstance('message'),
        };
        super(instances);
    }
    static getInstance() {
        if (!FileSystem.instance) {
            console.log('Iniciando instancia de FileSystem en Factory');
            FileSystem.instance = new FileSystem();
        }
        return FileSystem.instance;
    }
}
class Memory extends DAO {
    constructor() {
        // No creo una instancia para manejo de usuarios porque
        // no se puede implementar usando passport local y connect-mongo
        const instances = {
            products: memory_1.default.getInstance('product'),
            carts: memory_1.default.getInstance('cart'),
            messages: memory_1.default.getInstance('message'),
        };
        super(instances);
    }
    static getInstance() {
        if (!Memory.instance) {
            console.log('Iniciando instancia de Memory en Factory');
            Memory.instance = new Memory();
        }
        return Memory.instance;
    }
}
class DaoFactory {
    static create(type, esMongo) {
        // esMongo es una variable booleana que me sirve para saber si voy a usar un dao distinto a mongo
        // ya que de esa manera necesito instanciar mongo sólo para usuarios, por tema passport-local
        switch (type) {
            case 'mongo':
                const factoryMongo = MongoDB.getInstance(esMongo);
                return factoryMongo;
            case 'file':
                const factoryFile = FileSystem.getInstance();
                return factoryFile;
            case 'memory':
                const factoryMemory = Memory.getInstance();
                return factoryMemory;
            default:
                break;
        }
    }
}
exports.DaoFactory = DaoFactory;
