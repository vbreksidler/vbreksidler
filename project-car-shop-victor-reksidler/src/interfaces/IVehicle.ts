import { z } from 'zod';

const IVehicleZodSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  })
    .min(3, { 
      message: 'Model must be 3 or more characters long', 
    }),
  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  })
    .gte(1900, { 
      message: 'Year must be 1900 or greater', 
    })
    .lte(2022, { 
      message: 'Year must be 2022 or lesser', 
    }),
  color: z
    .string({
      required_error: 'Color is required',
      invalid_type_error: 'Color must be a string',
    })
    .min(3, { 
      message: 'Color must be 3 or more characters long', 
    }),
  buyValue: z.number({
    required_error: 'Buy Value is required',
    invalid_type_error: 'Buy Value must be a number',
  }).int(),
  status: z.boolean().optional(),
});

export type IVehicle = z.infer<typeof IVehicleZodSchema>;

export { IVehicleZodSchema };
