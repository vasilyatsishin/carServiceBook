export const blobToFileList = (blob: Blob) => {
  const file = new File([blob], "image.png", { type: blob.type });
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  return dataTransfer;
};

export const urlToFile = async (
  url: string,
  fileName: string
): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
};
