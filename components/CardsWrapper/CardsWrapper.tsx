import { DataType } from "@/types/data";
import styles from "./styles.module.css";

type CardsWrapperProps = {
  data: DataType | null;
};

const CardsWrapper = ({ data }: CardsWrapperProps) => {
  return (
    <div className={styles.main}>
      {data &&
        data.map((d) => {
          return <div key={d.id}>{d.name}</div>;
        })}
    </div>
  );
};

export default CardsWrapper;
