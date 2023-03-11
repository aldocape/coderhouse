"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_product_dto_1 = require("./dto/create-product.dto");
const product_dto_1 = require("./dto/product.dto");
const products_service_1 = require("./products.service");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async root() {
        const products = await this.productsService.getAllProducts();
        return { products };
    }
    getAll() {
        return this.productsService.getAllProducts();
    }
    getOneProduct(productId) {
        return this.productsService.getProduct(productId);
    }
    createNew(product) {
        return this.productsService.createProduct(product);
    }
    update(productId, product) {
        return this.productsService.updateProduct(productId, product);
    }
    deleteOneProduct(productId) {
        return this.productsService.deleteProduct(productId);
    }
};
__decorate([
    (0, common_1.Get)('/view'),
    (0, common_1.Render)('products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "root", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({
        description: 'Devuelve un array con todos los productos existentes',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Devuelve un array con todos los productos existentes',
        type: [product_dto_1.ProductDTO],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({
        description: 'Devuelve un producto buscando por id',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Devuelve un producto',
        type: product_dto_1.ProductDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getOneProduct", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiOperation)({
        description: 'Crear un nuevo producto',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Retorna el producto creado',
        type: product_dto_1.ProductDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createNew", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiOperation)({
        description: 'Modifica un producto existente',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Retorna el producto con la información modificada',
        type: product_dto_1.ProductDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_product_dto_1.CreateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({
        description: 'Borra un producto',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Si pudo eliminar el producto, devolverá la información del producto eliminado',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteOneProduct", null);
ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    (0, swagger_1.ApiTags)('Productos'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map