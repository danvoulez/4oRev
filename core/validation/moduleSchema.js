import { z } from "zod";

export const moduleSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  status: z.enum(["active", "inactive"]),
  role: z.array(z.string()),
  components: z.array(z.string()),
  created_at: z.string(),
  last_updated: z.string()
});