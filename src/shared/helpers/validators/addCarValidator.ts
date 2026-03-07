export const odometorValidator = (value: string) => {
  const numericValue = value.replace(/\./g, "");
  return /^\d*$/.test(numericValue);
};

export const isPhotoValid = (photo?: File | string) => {
  console.log("Validating photo:", photo);
  if (!photo) return false;

  // Якщо це рядок (URL), вважаємо його валідним
  if (typeof photo === "string") {
    return photo.length > 0;
  }

  // Якщо це файл, перевіряємо його MIME-тип
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  return allowedTypes.includes(photo.type);
};
