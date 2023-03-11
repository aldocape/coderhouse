import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Render,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateProductDTO } from './dto/create-product.dto';
import { ProductDTO } from './dto/product.dto';
import { ProductDocument } from './dto/product.schema';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Productos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/view')
  @Render('products')
  async root() {
    const products = await this.productsService.getAllProducts();
    return { products };
  }

  @Get('/')
  @ApiOperation({
    description: 'Devuelve un array con todos los productos existentes',
  })
  @ApiOkResponse({
    description: 'Devuelve un array con todos los productos existentes',
    type: [ProductDTO],
  })
  getAll(): Promise<ProductDocument[]> {
    return this.productsService.getAllProducts();
  }

  @Get('/:id')
  @ApiOperation({
    description: 'Devuelve un producto buscando por id',
  })
  @ApiOkResponse({
    description: 'Devuelve un producto',
    type: ProductDTO,
  })
  getOneProduct(@Param('id') productId: string): Promise<ProductDocument> {
    return this.productsService.getProduct(productId);
  }

  @Post('/')
  @ApiOperation({
    description: 'Crear un nuevo producto',
  })
  @ApiOkResponse({
    description: 'Retorna el producto creado',
    type: ProductDTO,
  })
  createNew(@Body() product: CreateProductDTO): Promise<ProductDocument> {
    return this.productsService.createProduct(product);
  }

  @Put('/:id')
  @ApiOperation({
    description: 'Modifica un producto existente',
  })
  @ApiOkResponse({
    description: 'Retorna el producto con la información modificada',
    type: ProductDTO,
  })
  update(
    @Param('id') productId: string,
    @Body() product: CreateProductDTO,
  ): Promise<ProductDocument> {
    return this.productsService.updateProduct(productId, product);
  }

  @Delete('/:id')
  @ApiOperation({
    description: 'Borra un producto',
  })
  @ApiOkResponse({
    description:
      'Si pudo eliminar el producto, devolverá la información del producto eliminado',
  })
  deleteOneProduct(@Param('id') productId: string): Promise<ProductDocument> {
    return this.productsService.deleteProduct(productId);
  }
}
