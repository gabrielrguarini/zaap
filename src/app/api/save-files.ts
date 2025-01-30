import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      galeryId,
      files,
    }: { galeryId: string; files: { url: string; description: string }[] } =
      await req.json();

    if (!galeryId || !files || files.length === 0) {
      return NextResponse.json(
        { error: "Galeria e arquivos são obrigatórios" },
        { status: 400 },
      );
    }

    // Verifica se a galeria existe
    const galery = await prisma.galery.findUnique({
      where: { id: galeryId },
    });

    if (!galery) {
      return NextResponse.json(
        { error: "Galeria não encontrada" },
        { status: 404 },
      );
    }

    // Cria as referências das imagens no banco de dados
    const createdImages = await prisma.image.createMany({
      data: files.map((file) => ({
        url: file.url,
        description: file.description,
        galeryId: galeryId,
      })),
    });

    return NextResponse.json({
      message: "Imagens salvas com sucesso!",
      images: createdImages,
    });
  } catch (error) {
    console.error("Erro ao salvar imagens no banco de dados:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}
