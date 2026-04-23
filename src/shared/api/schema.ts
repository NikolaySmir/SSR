import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.coerce.date(),
});

export type CreateEventSchema = z.infer<typeof CreateEventSchema>;

export const JoinEventSchema = z.object({
  id: z.number().int().positive(),
});

export const LeaveEventSchema = z.object({
  id: z.number(),
});

export const UpdateEventSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Название обязательно"),
  description: z.string().optional(),
  date: z.date(),
});
