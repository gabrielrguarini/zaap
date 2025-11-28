import { resetDb } from "../helpers/reset-db";
import {
  createGallery,
  updateGallery,
  deleteGallery,
  getGalleryById,
} from "@/app/controllers/gallery";
import { setImagesToGalery } from "@/app/controllers/images";
import { prisma } from "@/utils/prisma";
import { s3 } from "@/utils/s3Client";

describe("Gallery Operations", () => {
  beforeEach(async () => {
    await resetDb();
    jest.clearAllMocks();
  });

  // Helper to create a gallery for other tests
  const createTestGallery = async (id: string = "test-gallery-id") => {
    await createGallery({
      id,
      title: "Original Gallery",
      type: "Party",
      location: "Original Location",
      date: new Date("2023-10-27"),
      image: "original-image.jpg",
    });
    return id;
  };

  it("should create a gallery with initial image", async () => {
    const galleryId = "new-gallery-id";
    const imageKey = "cover-image.jpg";

    await createGallery({
      id: galleryId,
      title: "New Gallery",
      type: "Wedding",
      location: "New Location",
      date: new Date("2024-01-01"),
      image: imageKey,
    });

    const gallery = await getGalleryById(galleryId);
    expect(gallery).toBeDefined();
    expect(gallery?.title).toBe("New Gallery");
    expect(gallery?.imageUrl).toContain(imageKey);
  });

  it("should add extra images to an existing gallery", async () => {
    const galleryId = await createTestGallery();
    const extraImages = ["img1.jpg", "img2.jpg"];

    await setImagesToGalery({
      galleryId,
      files: extraImages,
    });

    const images = await prisma.image.findMany({
      where: { galleryId },
      orderBy: { url: "asc" },
    });

    expect(images).toHaveLength(2);
    expect(images[0].url).toContain(extraImages[0]);
    expect(images[1].url).toContain(extraImages[1]);
  });

  it("should update gallery details and replace cover image", async () => {
    const galleryId = await createTestGallery();
    const newImageKey = "new-cover.jpg";

    await updateGallery({
      id: galleryId,
      title: "Updated Title",
      type: "Updated Type",
      location: "Updated Location",
      date: new Date("2025-01-01"),
      image: newImageKey,
    });

    const updatedGallery = await getGalleryById(galleryId);
    expect(updatedGallery?.title).toBe("Updated Title");
    expect(updatedGallery?.type).toBe("Updated Type");
    expect(updatedGallery?.imageUrl).toContain(newImageKey);
  });

  it("should update gallery details without changing image", async () => {
    const galleryId = await createTestGallery();

    await updateGallery({
      id: galleryId,
      title: "Just Title Change",
      type: "Party",
      location: "Original Location",
    });

    const updatedGallery = await getGalleryById(galleryId);
    expect(updatedGallery?.title).toBe("Just Title Change");
    expect(updatedGallery?.imageUrl).toContain("original-image.jpg");
  });

  it("should delete gallery and cascade delete images", async () => {
    const galleryId = await createTestGallery();

    // Add some extra images to verify cascade delete
    await setImagesToGalery({
      galleryId,
      files: ["extra.jpg"],
    });

    await deleteGallery(galleryId);

    // Verify gallery is gone
    const gallery = await getGalleryById(galleryId);
    expect(gallery).toBeNull();

    // Verify images are gone
    const images = await prisma.image.findMany({ where: { galleryId } });
    expect(images).toHaveLength(0);

    // Verify S3 cleanup was triggered
    expect(s3.send).toHaveBeenCalled();
  });
});
