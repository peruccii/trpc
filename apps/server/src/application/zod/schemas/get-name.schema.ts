import { z } from 'zod';

export const schema = z.object({
  age: z
    .number()
    .min(0, 'Your age must be at least 3 years old')
    .max(80, 'Your age must be less than 80 years old'),
});

export type TypeAge = z.infer<typeof schema>;
