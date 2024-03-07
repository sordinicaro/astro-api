import zod from "zod";

const userSchema = zod.object({
  name: zod.string().min(4).max(10),
  email: zod.string().email(),
});

const validateUser = (newUser: any) => {
  const responseValidator = userSchema.safeParse(newUser);
  return responseValidator;
};

const validatePartialUser = (newUser: any) => {
  const responseValidator = userSchema.partial().safeParse(newUser);
  return responseValidator;
};

export { validateUser, validatePartialUser };

