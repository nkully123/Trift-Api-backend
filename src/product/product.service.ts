import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { Product } from './product-model-shema';

@Injectable()
export class ProductService {
	logger: Logger;
	constructor(@InjectModel('Product') private readonly __productModel: Model<Product> ){
		this.logger = new Logger(ProductService.name)
	}

	async addNewProductToTheDatabase(product: any){
		try {
			const product_model = new this.__productModel(product);
			const prod = await product_model.save();
			return { phoneNumber: prod.phoneNumber, id: prod.id, email: prod.email, name: prod.name, size: prod.size, pricee: prod.price,  color: prod.color,address: prod.address}
		} catch (error) {
			
			this.logger.log(error)

			if (error.code === 11000) {
				if (error.keyValue.product) throw new BadRequestException("product number already exists");
				if (error.keyValue.email) throw new BadRequestException("Email already exists");
				if (error.keyValue.phone) throw new BadRequestException("Phone Number already exists");
			}
			throw new BadRequestException(error);
		}
	}

	async getAllproductsFromTheDatabase(){
		return (await this.__productModel.find().sort({ name: 1 }).exec()).map((prod: any) => ({ id: prod.id, product: prod.product, email: prod.email, name: prod.name }));
	}




	// async updateOneproductFromTheDatabase(productId: string, new_product: any){
	// 	const current_product = await this.findOneproductFromTheDatabase(productId);

	// 	if (new_product.email) current_product.email = new_product.email;
	// 	if (new_product.phone) current_product.phone = new_product.phone;
	// 	if (new_product.name) current_product.name = new_product.name;

	// 	try {
	// 		const product_model = new this.__productModel(current_product);
	// 		const book = await product_model.save();
	// 		return { id: book.id, phone: book.phone, email: book.email, name: book.name }
	// 	} catch (error) {
	// 		if (error.code === 11000) {
	// 			if (error.keyValue.phone) throw new BadRequestException("Phone number already exists");
	// 			if (error.keyValue.email) throw new BadRequestException("Email already exists");
	// 		}
	// 		throw new BadRequestException(error);
	// 	}
	// }

	// async deleteOneProductFromTheDatabase(productId: string){
	// 	await this.deleteOneProductFromTheDatabase(productId);
	// 	const remove_product = await this.__productModel.findOneAndDelete({ _id: productId }).exec();
	// 	return { message: `successfully deleted ${remove_product.name}'s number` };
	// }

	// async searchProductByNameOrNumber(requset: any){
	// 	return (await this.__productModel.find({
	// 		$or: [ 
	// 			{ name: new RegExp(requset.query.s.toString(), 'i' )}, 
	// 			{ email: new RegExp(requset.query.s.toString(), 'i' )}, 
	// 		] 
	// 	}).sort({ name: 1 }).exec()).map((book: any) => ({ id: book.id, phone: book.phone, email: book.email, name: book.name }));
	// }

	// async findOneproductFromTheDatabase(id: string){
	// 	let product: any;
	// 	let  phonetwo: any;

	// 	try {
	// 		product = await this.__productModel.findOne({ _id: id});
	// 	} catch (error) {
	// 		throw new NotFoundException('Contact Not In Your product');
	// 	}

	// 	if (!product) throw new NotFoundException('Contact Not In Your product');

	// 	return product;
	// }
}
