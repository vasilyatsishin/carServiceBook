import React, { useEffect, useRef, useState } from "react";
import styles from "./PhotoInput.module.css";
import { compressImage } from "../../helpers/compressPhoto";

interface PhotoInputProps {
  placeholder: string;
  // Оновлюємо типи, щоб приймати рядок (URL)
  setData: React.Dispatch<React.SetStateAction<File | string | undefined>>;
  data: File | string | undefined;
}

const PhotoInput: React.FC<PhotoInputProps> = ({
  setData,
  placeholder,
  data,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    // Якщо це не зображення, просто передаємо як є (для валідації)
    if (!file.type.startsWith("image/")) {
      setData(file as any);
      return;
    }

    // Стискаємо та встановлюємо як новий файл
    const compressedFile = await compressImage(file, 800, 0.7);
    setData(compressedFile);
  };

  useEffect(() => {
    if (!data) {
      setPreview("");
      return;
    }

    // ЛОГІКА ПРЕВ'Ю
    if (typeof data === "string") {
      // Якщо прийшов URL (редагування), просто ставимо його в стейт
      setPreview(data);
    } else if (data instanceof File) {
      // Якщо прийшов файл (нове завантаження), створюємо blob-посилання
      const objectUrl = URL.createObjectURL(data);
      setPreview(objectUrl);

      // Обов'язково очищаємо пам'ять тільки для об'єктів File
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [data]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={styles.mainWrapper}>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept="image/jpeg,image/png,image/jpg" // Обмежуємо вибір у провіднику
        style={{ display: "none" }}
      />

      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className={styles.previewImage}
          onClick={handleClick}
        />
      ) : (
        <div className={styles.inputWrapper} onClick={handleClick}>
          <div className={styles.placeholder}>{placeholder}</div>
        </div>
      )}
    </div>
  );
};

export default PhotoInput;
