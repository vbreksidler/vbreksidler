import { model as mongooseCarModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carsMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  status: Boolean,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

export default class Cars extends MongoModel<ICar> {
  constructor(model = mongooseCarModel('Cars', carsMongooseSchema)) {
    super(model);
  }
}