"use server";
import { Dialog } from "@/app/_components/dialog";
import { GalleryForm } from "@/app/_components/gallery-form";
import UploadForm from "@/app/_components/upload-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { TableRow } from "./_components/table-row";
import { getGalleries } from "@/app/controllers/gallery";
import { Calendar, ImagePlus, KeyRound, Map, PartyPopper } from "lucide-react";

export default async function AdminPage() {
  const sessao = await auth();
  if (!sessao) {
    redirect("/sign-in");
  }
  const galleries = await getGalleries({ search: "", isPublicFilter: false });
  return (
    <div>
      <Dialog
        className="mx-4 hover:bg-zinc-700"
        title="Adicionar Evento"
        buttonString="Adicionar Evento"
      >
        <GalleryForm />
      </Dialog>
      <Dialog
        className="hover:bg-zinc-700"
        buttonString="Adicionar Imagens"
        title="Adicionar Imagens"
      >
        <UploadForm />
      </Dialog>
      <div className="mx-auto flex max-w-7xl flex-col px-4 py-8">
        <h2 className="text-3xl">Galerias Cadastradas</h2>
        <div className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
              <thead className="rtl:textRight ltr:text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                    <span className="inline-flex items-center justify-center">
                      <KeyRound />
                    </span>
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                    <span className="inline-flex items-center justify-center">
                      <PartyPopper />
                    </span>
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                    <span className="inline-flex items-center justify-center">
                      <Map />
                    </span>
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                    <span className="inline-flex items-center justify-center">
                      <Calendar />
                    </span>
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                    <span className="inline-flex items-center justify-center">
                      <ImagePlus />
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {galleries.map((gallery) => (
                  <TableRow
                    isPublic={gallery.isPublic}
                    key={gallery.id}
                    id={gallery.id}
                    name={gallery.title}
                    location={gallery.location || ""}
                    date={
                      gallery.date
                        ? new Date(gallery.date).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : ""
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 dark:border-gray-700">
            <ol className="flex justify-end gap-1 text-xs font-medium">
              <li>
                <a
                  href="#"
                  className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  <span className="sr-only">Prev Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded-sm border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  1
                </a>
              </li>

              <li className="block size-8 rounded-sm border-blue-600 bg-blue-600 text-center leading-8 dark:text-white">
                2
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded-sm border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  3
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded-sm border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  4
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                >
                  <span className="sr-only">Next Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ol>
          </div> */}
        </div>
      </div>
    </div>
  );
}
