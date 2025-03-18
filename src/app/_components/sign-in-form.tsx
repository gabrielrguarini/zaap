"use client";
import { signIn } from "next-auth/react";

export const SignInForm = () => {
  const credentialsAction = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    signIn("credentials", { email, password });
  };
  return (
    <div className="flex-grow">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-foreground p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-200">Login</h2>
          <form className="flex flex-col" action={credentialsAction}>
            <input
              className="mb-4 rounded-md border-0 bg-background p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-primary"
              type="email"
              placeholder="Email"
              name="email"
            />

            <input
              className="mb-4 rounded-md border-0 bg-background p-2 text-gray-200 transition duration-150 ease-in-out focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-primary"
              type="password"
              placeholder="Senha"
              name="password"
            />
            <input
              className="mt-4 rounded-md bg-gradient-to-r from-[#ffb400] to-primary px-4 py-2 font-bold text-foreground transition duration-150 ease-in-out hover:from-primary hover:to-[#ffb400]"
              type="submit"
              value="Sign In"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
