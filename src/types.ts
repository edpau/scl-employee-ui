export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string;
  address: string;
}

import { z } from 'zod';

export const AddEmployeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email('Invalid email'),
  mobileNumber: z
    .string()
    .min(7, 'Too short')
    .max(20, 'Too long')
    .regex(/^[\d\s()+-]+$/, { message: 'Invalid phone characters' })
    .optional(),
  address: z.string().min(1, 'Address is required'),
});

export type AddEmployeeFormData = z.infer<typeof AddEmployeeSchema>;
