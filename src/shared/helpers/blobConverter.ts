export const blobToFileList = (blob: Blob) => {
  const file = new File([blob], "image.png", { type: blob.type });
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  return dataTransfer;
};
