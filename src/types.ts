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
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z
    .string()
    .trim()
    .transform((s) => s.toLowerCase())
    .pipe(z.email({ message: 'Invalid email' })),
  mobileNumber: z
    .string()
    .trim()
    .transform((v) => (v === '' ? undefined : v))
    .refine((v) => v === undefined || v.length >= 7, { message: 'Too short' })
    .refine((v) => v === undefined || v.length <= 20, { message: 'Too long' })
    .refine((v) => v === undefined || /^[\d\s()+-]+$/.test(v), {
      message: 'Invalid phone characters',
    })
    .or(z.undefined()),

  address: z.string().trim().min(1, 'Address is required'),
});

export type AddEmployeeFormData = z.infer<typeof AddEmployeeSchema>;

// api
export type ErrorResponse = {
  error?: string;
  validation_errors?: Record<string, string>;
};
