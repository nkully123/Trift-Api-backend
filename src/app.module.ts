import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
	imports: [
		MongooseModule.forRoot("mongodb+srv://nonkululeko:nonku@cluster0.ljryq.mongodb.net/productDatabase?retryWrites=true&w=majority", { autoCreate: true, }),
		// MongooseModule.forRoot("mongodb://localhost:27017/PHONEBOOK_DB", { autoCreate: true }),
		//push
		ProductModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}


      