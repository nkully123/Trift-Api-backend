import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { Request } from 'express';

@Controller('product')
export class ProductController {

	constructor(private __product: ProductService) {}

	//  @Get('search')
	//  async searchProduct(@Req() req: Request){
	// 	return await this.__product.searchProductByNameOrNumber(req);
	// }

	@Post()
	async addNewProduct(@Body() product : { phoneNumber: number, email: string, name: string, size:string, color:string,address:string }){
		return await this.__product.addNewProductToTheDatabase(product);
	}

	@Get()
	async getAllproductsFromTheDatabase(){
		return await this.__product.getAllproductsFromTheDatabase();
	}

	// @Get('/:productId')
	// async getOneProduct(@Param('productId') productId: string ){
	// 	return await this.__product.getOneProductFromTheDatabase(productId);
	// }

	// @Patch('/:phonebookId')
	// async updateOnePhonebook(@Param('phonebookId') phonebookId: string, @Body() phonebook : { phone: number, email: string, name: string }){
	// 	return await this.__product.updateOneProductFromTheDatabase(phonebookId, phonebook);
	// }

	// @Delete('/:productId')
	// async deleteOneProduct(@Param('productId') productId: string )
	// {
	// 	return await this.__product.deleteOneProductFromTheDatabase(productId);
	// }

}
