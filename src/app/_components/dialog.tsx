"use client";
import { X } from "lucide-react";
import { useRef } from "react";

interface DialogProps {
  children: React.ReactNode;
  buttonString: string;
  buttonElement?: React.ReactNode;
  title: string;
  className?: string;
}
export const Dialog = ({
  children,
  buttonString,
  buttonElement,
  title,
  className,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };
  return (
    <>
      {buttonElement ? (
        <div
          className={className}
          data-modal={buttonString}
          onClick={openDialog}
        >
          {buttonElement}
        </div>
      ) : (
        <button
          className={`cursor-pointer rounded bg-foreground py-1 leading-3 lg:px-4 lg:py-2 ${className}`}
          data-modal={buttonString}
          onClick={openDialog}
        >
          {buttonString}
        </button>
      )}
      <dialog
        onClick={(e) => e.currentTarget === e.target && closeDialog()}
        className="backdrop:bg-black/70"
        id={buttonString}
        ref={dialogRef}
      >
        <X
          className="absolute right-4 top-4 cursor-pointer text-white"
          onClick={closeDialog}
        />

        <div className="border-back bg-background bg-opacity-50 p-8 text-white">
          <h1 className="pb-2 text-3xl font-bold text-primary">{title}</h1>
          {children}
          {/* <button
            className="text-bold mt-2 rounded bg-foreground px-4 py-2"
            onClick={closeDialog}
          >
            Fechar
          </button> */}
        </div>
      </dialog>
    </>
  );
};
