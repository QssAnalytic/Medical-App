import { z } from "zod";

type SignInResponse = {
  access: string;
  refresh: string;
};

type SignInPayload = {
  email: string;
  password: string;
};

type User = {
  email: string;
  role : string
};

const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type { SignInResponse, SignInPayload, User };
export { SignInSchema };
