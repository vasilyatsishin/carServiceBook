export const odometorValidator = (value: string) => {
  const numericValue = value.replace(/\./g, "");
  return /^\d*$/.test(numericValue);
};

export const isPhotoValid = (file?: File) => {
  if (!file) return false;
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  return allowedTypes.includes(file.type);
};
