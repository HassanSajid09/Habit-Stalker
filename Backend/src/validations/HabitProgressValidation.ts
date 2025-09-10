import { z } from "zod";

const habitProgressValidation = z.object({
  completed: z.boolean().optional(),
});

export default habitProgressValidation;
