"use client";
import { FormEvent } from "react";

export default function UploadPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget);

    const files = e.currentTarget.file.files;
    console.log(files);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="title" />
        <input type="file" name="file" multiple />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
}
