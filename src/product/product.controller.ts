import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { Request } from 'express';

@Controller('product')
export class ProductController {

	constructor(private __product: ProductService) {}

	@Get('search')
	async searchProduct(@Req() req: Request){
		return await this.__product.searchProductByNameOrNumber(req);
	}

	@Post()
	async addNewProduct(@Body() product : { phone: number, email: string, name: string }){
		return await this.__product.addNewProductToTheDatabase(product);
	}

	@Get()
	async getAllproductsFromTheDatabase(){
		return await this.__product.getAllproductsFromTheDatabase();
	}


   



	// @Get('/:phonebookId')
	// async getOnePhonebook(@Param('phonebookId') phonebookId: string ){
	// 	return await this.__product.getOnePhonebookFromTheDatabase(phonebookId);
	// }

	// @Patch('/:phonebookId')
	// async updateOnePhonebook(@Param('phonebookId') phonebookId: string, @Body() phonebook : { phone: number, email: string, name: string }){
	// 	return await this.__product.updateOneProductFromTheDatabase(phonebookId, phonebook);
	// }

	@Delete('/:productId')
	async deleteOneProduct(@Param('productId') productId: string )
	{
		return await this.__product.deleteOneProductFromTheDatabase(productId);
	}

}