import styles from "./styles.module.css";

type SpinnerProps = {
  size?: number;
  label?: string;
  className?: string;
};

const Spinner = ({ size = 24, label = "Loading", className }: SpinnerProps) => {
  const spinnerClassName = className
    ? `${styles.spinner} ${className}`
    : styles.spinner;

  return (
    <div className={styles.wrapper}>
      <div
        role="status"
        aria-label={label}
        className={spinnerClassName}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  );
};

export default Spinner;
