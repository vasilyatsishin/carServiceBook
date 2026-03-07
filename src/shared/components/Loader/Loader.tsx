import type React from "react";
import styles from "./Loader.module.css";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  visible: boolean;
}

const Loader: React.FC<LoaderProps> = ({ visible }) => {
  return (
    <>
      {visible && (
        <div className={styles.emptyContainer}>
          <ClipLoader
            color="#000"
            loading={visible}
            size={35}
            aria-label="Loading Spinner"
          />
        </div>
      )}
    </>
  );
};

export default Loader;
