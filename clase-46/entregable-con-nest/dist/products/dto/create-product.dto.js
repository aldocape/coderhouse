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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateProductDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bicicleta Mountain Bike Rodado 26' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 90),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Es una bicicleta ideal para personas que se inician en este apasionante deporte, muy bien equipada sin descuidar el presupuesto del usuario.',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '78849280827',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "codigo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://http2.mlstatic.com/D_NQ_NP_708965-MLA53856285905_022023-O.webp',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "foto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 65000 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDTO.prototype, "precio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDTO.prototype, "stock", void 0);
exports.CreateProductDTO = CreateProductDTO;
//# sourceMappingURL=create-product.dto.js.map