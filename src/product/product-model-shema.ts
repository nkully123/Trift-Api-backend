import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    phoneNumber: { type: String },
	email: { type: String},
	name: { type: String},
	size: { type:String},
	color:{type:String},
	price: {type:Number},
	address: {type: String},

});

export interface Product extends mongoose.Document{
	size: number;
	price: number;
   color: string;
	email: string;
	name: string;
	phoneNumber: string;
	address: string;

}
