const DATA_IMAGE = /^data:image\/(jpeg|png|webp);base64,[a-z0-9+/=\s]+$/i;

export function safeImage(src: string): string | null {
  return DATA_IMAGE.test(src) ? src : null;
}

/** Shrink a photo before it is stored, so the same copy fits on every device. */
export async function fileToImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("format");
  }
  const bitmap = await createImageBitmap(file);
  try {
    const maxWidth = 1200;
    const scale = Math.min(1, maxWidth / bitmap.width);
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("canvas");
    context.drawImage(bitmap, 0, 0, width, height);
    let quality = 0.82;
    let url = canvas.toDataURL("image/jpeg", quality);
    while (url.length > 380_000 && quality > 0.45) {
      quality -= 0.08;
      url = canvas.toDataURL("image/jpeg", quality);
    }
    if (!safeImage(url) || url.length > 420_000) throw new Error("size");
    return url;
  } finally {
    bitmap.close();
  }
}
