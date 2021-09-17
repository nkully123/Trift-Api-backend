import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	
	let log = new Logger();

	let logger = new Logger();

	app.enableCors({
		origin: ['http://localhost:4200','https://nonkululeko-phonebook.netlify.app'],
		credentials: true
	});
	app.setGlobalPrefix('api');

	const port = process.env.PORT || 3000;

	await app.listen(port);

	logger.log(`Listening on port: ${port}`)
}
bootstrap();


