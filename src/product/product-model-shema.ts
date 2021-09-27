import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    phoneNumber: { type: Number, required: [ true, 'Phone number is required' ] , unique: [ true, "Phone number already exists" ] },
	email: { type: String, defualt: null, index: { unique: true, sparse: true } },
	name: { type: String, required: [ true, 'Name is required' ] },
	size: { type:String,required:[true, 'Size is required '] },
	color:{}

});

export interface Product extends mongoose.Document{
	size: number;
	price: number;
    color: string;
	email: string;
	name: string;
	phoneNumber: number;
	address: string;

}
