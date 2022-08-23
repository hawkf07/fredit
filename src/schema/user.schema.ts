import z from 'zod';
export const userSchema = z.object({
  name: z.string().min(1).max(20),
  id: z.number()
});

export type createUserSchema = z.TypeOf<typeof userSchema>;
