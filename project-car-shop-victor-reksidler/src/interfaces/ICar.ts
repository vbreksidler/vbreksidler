import { z } from 'zod';
import { IVehicleZodSchema } from './IVehicle';

const ICarZodSchema = IVehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'doorsQty must be a number',
  }).gte(2, { 
    message: 'Year must be 1900 or greater', 
  })
    .lte(4, { 
      message: 'Year must be 2022 or lesser', 
    })
    .int(),
  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).gte(2, { 
    message: 'seatsQty must be 2 or greater', 
  })
    .lte(4, { 
      message: 'seatsQty must be 4 or lesser', 
    })
    .int(),
});

export type ICar = z.infer<typeof ICarZodSchema>;

export { ICarZodSchema };