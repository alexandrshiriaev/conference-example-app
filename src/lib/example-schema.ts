import { z } from 'zod';

export const exampleSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .min(1, { message: 'Invalid email address' }),
    password: z
        .string()
        .min(5, {
            message:
                'The password must contain at least 5 characters and no more than 20',
        })
        .max(20, {
            message:
                'The password must contain at least 5 characters and no more than 20',
        }),
    age: z.coerce
        .number({ message: 'Not a number' })
        .gte(18, 'You must be at least 18 years old'),
});
