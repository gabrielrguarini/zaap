"use client";

import { createUser } from "../controllers/user";

export const CreateUserButton = () => {
  return (
    <button
      onClick={async () =>
        await createUser("hyvan_alexandre@hotmail.com", "HyvanS3nh@123")
      }
    >
      Criar administrador
    </button>
  );
};
