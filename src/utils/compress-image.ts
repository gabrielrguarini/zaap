type CompressImageProps = {
  file: File;
  quality?: number;
  maxDimension?: number;
};

const supportedTypes = ["image/jpeg", "image/png", "image/webp"];

export function compressImage({
  file,
  quality = 0.99,
  maxDimension = 1920,
}: CompressImageProps): Promise<File> {
  return new Promise((resolve, reject) => {
    if (!supportedTypes.includes(file.type)) {
      reject(
        new Error(
          `Unsupported file type: ${file.type}. Supported types: ${supportedTypes.join(", ")}`,
        ),
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        // Calculate target dimensions preserving aspect ratio
        let targetWidth = image.width;
        let targetHeight = image.height;

        // Only resize if image is larger than maxDimension
        const maxImageDimension = Math.max(image.width, image.height);
        if (maxImageDimension > maxDimension) {
          const scale = maxDimension / maxImageDimension;
          targetWidth = Math.round(image.width * scale);
          targetHeight = Math.round(image.height * scale);
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        context.drawImage(image, 0, 0, targetWidth, targetHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const fileName = file.name.replace(/\.[^.]+$/, ".webp");
              const compressedFile = new File([blob], fileName, {
                type: "image/webp",
                lastModified: file.lastModified,
              });
              resolve(compressedFile);
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          "image/webp",
          quality,
        );
      };

      image.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      image.src = event.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}
