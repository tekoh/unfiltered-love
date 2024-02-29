import { object, string } from "zod";

export const createPost = object({
  to: string().toLowerCase().max(15),
  text: string().max(100),
  colour: string().length(6),
});
