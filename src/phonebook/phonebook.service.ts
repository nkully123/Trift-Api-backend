import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { Phonebook } from './phonebook-model-shema';

@Injectable()
export class PhonebookService {

	constructor(@InjectModel('Phonebook') private readonly __phonebookModel: Model<Phonebook> ){}

	async addNewPhonebookToTheDatabase(phonebook: any){
		try {
			const phonebook_model = new this.__phonebookModel(phonebook);
			const book = await phonebook_model.save();
			return { id: book.id, phone: book.phone, email: book.email, name: book.name }
		} catch (error) {
			if (error.code === 11000) {
				if (error.keyValue.phone) throw new BadRequestException("Phone number already exists");
				if (error.keyValue.email) throw new BadRequestException("Email already exists");
			}
			throw new BadRequestException(error);
		}
	}

	async getAllPhonebooksFromTheDatabase(){
		return (await this.__phonebookModel.find().sort({ name: 1 }).exec()).map((book: any) => ({ id: book.id, phone: book.phone, email: book.email, name: book.name }));
	}

	async getOnePhonebookFromTheDatabase(phonebookId: string){
		const book = await this.findOnePhonebookFromTheDatabase(phonebookId);
		return { id: book.id, phone: book.phone, email: book.email, name: book.name };
	}

	async updateOnePhonebookFromTheDatabase(phonebookId: string, new_phonebook: any){
		const current_phonebook = await this.findOnePhonebookFromTheDatabase(phonebookId);

		if (new_phonebook.email) current_phonebook.email = new_phonebook.email;
		if (new_phonebook.phone) current_phonebook.phone = new_phonebook.phone;
		if (new_phonebook.name) current_phonebook.name = new_phonebook.name;

		try {
			const phonebook_model = new this.__phonebookModel(current_phonebook);
			const book = await phonebook_model.save();
			return { id: book.id, phone: book.phone, email: book.email, name: book.name }
		} catch (error) {
			if (error.code === 11000) {
				if (error.keyValue.phone) throw new BadRequestException("Phone number already exists");
				if (error.keyValue.email) throw new BadRequestException("Email already exists");
			}
			throw new BadRequestException(error);
		}
	}

	async deleteOnePhonebookFromTheDatabase(phonebookId: string){
		await this.findOnePhonebookFromTheDatabase(phonebookId);
		const remove_phonebook = await this.__phonebookModel.findOneAndDelete({ _id: phonebookId }).exec();
		return { message: `successfully deleted ${remove_phonebook.name}'s number` };
	}

	async searchPhonebookByNameOrNumber(requset: any){
		return (await this.__phonebookModel.find({
			$or: [ 
				{ name: new RegExp(requset.query.s.toString(), 'i' )}, 
				{ email: new RegExp(requset.query.s.toString(), 'i' )}, 
			] 
		}).sort({ name: 1 }).exec()).map((book: any) => ({ id: book.id, phone: book.phone, email: book.email, name: book.name }));
	}

	async findOnePhonebookFromTheDatabase(id: string){
		let phonebook: any;
		let  phonetwo: any;

		try {
			phonebook = await this.__phonebookModel.findOne({ _id: id});
		} catch (error) {
			throw new NotFoundException('Contact Not In Your Phonebook');
		}

		if (!phonebook) throw new NotFoundException('Contact Not In Your Phonebook');

		return phonebook;
	}
}
