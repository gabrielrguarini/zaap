type CompressImageProps = {
  file: File;
  quality?: number;
  width?: number;
  height?: number;
};

const supportedTypes = ["image/jpeg", "image/png", "image/webp"];

export function compressImage({
  file,
  quality = 0.99,
  width = 1920,
  height = 1920,
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

        const aspectRatio = image.width / image.height;
        let targetWidth = width;
        let targetHeight = height;

        if (image.width > image.height) {
          targetHeight = Math.round(targetWidth / aspectRatio);
        } else {
          targetWidth = Math.round(targetHeight * aspectRatio);
        }

        if (targetWidth > image.width && targetHeight > image.height) {
          targetWidth = image.width;
          targetHeight = image.height;
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
