import React, { useEffect, useRef, useState } from "react";
import styles from "./PhotoInput.module.css";
import { compressImage } from "../../helpers/compressPhoto";

interface PhotoInputProps {
  placeholder: string;
  setData: React.Dispatch<React.SetStateAction<File | undefined>>;
  data: File | undefined;
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

    if (!file.type.startsWith("image/")) {
      setData(file);
      return;
    }

    const compressedFile = await compressImage(file, 800, 0.7);
    setData(compressedFile);
  };

  useEffect(() => {
    if (!data) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(data);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl); // очищаємо після розмонтування
  }, [data]);

  const handleClick = () => {
    inputRef.current?.click(); // викликаємо стандартний file picker
  };

  return (
    <div className={styles.mainWrapper}>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
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
