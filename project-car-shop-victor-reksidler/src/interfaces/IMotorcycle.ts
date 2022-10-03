import { z } from 'zod';
import { IVehicleZodSchema } from './IVehicle';

const IMotoZodSchema = IVehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().positive().max(2500),
});

export type IMotorcycle = z.infer<typeof IMotoZodSchema>;

export { IMotoZodSchema };