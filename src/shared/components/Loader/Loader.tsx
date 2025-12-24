import type React from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  visible: boolean;
}

const Loader: React.FC<LoaderProps> = ({ visible }) => {
  return (
    <>
      {visible && (
        <div className={styles.mainWrapper}>
          <span className={styles.loader}></span>
        </div>
      )}
    </>
  );
};

export default Loader;
