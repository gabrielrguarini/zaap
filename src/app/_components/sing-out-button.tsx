"use client";

import { signOut } from "next-auth/react";

export const SingOutButton = () => {
  return (
    <button
      onClick={async () => {
        await signOut();
      }}
      className="w-ful h-full rounded-full bg-background px-8"
    >
      Sair
    </button>
  );
};
