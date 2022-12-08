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
const knex_1 = __importDefault(require("knex"));
class SQLClient {
    // Recibo en el constructor el objeto de configuración de knex y
    // el nombre de la tabla sobre la cual trabajará
    constructor(config, table) {
        this.knex = knex_1.default(config);
        this.table = table;
    }
    listProducts(id = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.knex(this.table).select('*').where(id);
        });
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.knex(this.table).insert(product);
        });
    }
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.knex(this.table).where('id', product.id).update(product);
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.knex(this.table).where('id', id).del();
        });
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.knex.schema.dropTableIfExists(this.table);
            yield this.knex.schema.createTable(this.table, (table) => {
                table.increments('id').primary();
                table.string('timestamp', 50).notNullable();
                table.string('nombre', 200).notNullable();
                table.string('descripcion', 400);
                table.string('codigo', 100).notNullable();
                table.string('foto', 400).notNullable();
                table.float('precio').notNullable();
                table.integer('stock').notNullable();
            });
        });
    }
    createProductsHardcoded() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = [
                {
                    timestamp: '09/11/2022 07:30:42',
                    nombre: 'Colchón 2 1/2 plazas de espuma Piero box blanco y gris - 140cm x 190cm x 25cm',
                    descripcion: 'Construido con espuma de poliuretano, el colchón tiene una larga y duradera vida. Este tipo de material hace que la posición que adopte el cuerpo sea ergonómica y permite que se reparta el peso sobre la superficie de manera balanceada.',
                    codigo: 'Piero2331',
                    foto: 'https://http2.mlstatic.com/D_NQ_NP_622492-MLA48099676614_112021-O.webp',
                    precio: 61619,
                    stock: 3,
                },
                {
                    timestamp: '09/11/2022 07:33:49',
                    nombre: 'Microondas Tedge 20 Litros Digital Blanco 220v 5 Potencia',
                    descripcion: 'Somos TEDGE. Nos propusimos crear productos de tecnología con alta calidad, ofreciendo a nuestros compradores una gran variedad y los mejores precios del mercado.',
                    codigo: 'Tedge4890',
                    foto: 'https://http2.mlstatic.com/D_NQ_NP_984100-MLA48430605662_122021-O.webp',
                    precio: 20999,
                    stock: 6,
                },
                {
                    timestamp: '09/11/2022 07:35:19',
                    nombre: 'Google Chromecast 3.ª Generación Full Hd Carbón',
                    descripcion: 'Gracias a su compatibilidad con streaming en Full HD vas a aprovechar de todo el contenido disponible que más te guste en alta definición, con imágenes de colores más vibrantes y llamativos en comparación a su predecesor HD.',
                    codigo: 'SKU GA00439-LA',
                    foto: 'https://http2.mlstatic.com/D_NQ_NP_620605-MLA32691559317_102019-O.webp',
                    precio: 12499,
                    stock: 10,
                },
            ];
            return yield this.knex(this.table).insert(products);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.knex.destroy();
        });
    }
}
exports.default = SQLClient;
