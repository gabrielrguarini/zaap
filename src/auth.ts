import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // Para validar a senha
import { getUser } from "./app/controllers/user"; // Função para buscar o usuário no DB
import { signInSchema } from "./schemas/userSchema"; // Validação de dados do usuário
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const userFromDb = await getUser(email);

          if (!userFromDb) {
            throw new Error("No user found");
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            userFromDb.password,
          );

          if (!isPasswordValid) {
            throw new Error("Invalid credentials");
          }

          const user = {
            name: userFromDb.name,
            email: userFromDb.email,
          };

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
});
