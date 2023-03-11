import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductDocument, ProductCollectioName } from './dto/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductCollectioName)
    private ProductModel: Model<ProductDocument>,
  ) {}

  async getAllProducts() {
    return this.ProductModel.find();
  }

  async getProduct(id: string) {
    return this.ProductModel.findById(id);
  }

  async createProduct(product: CreateProductDTO) {
    return this.ProductModel.create(product);
  }

  async updateProduct(id: string, product: CreateProductDTO) {
    return this.ProductModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }

  async deleteProduct(id: string) {
    return this.ProductModel.findByIdAndDelete(id);
  }
}
