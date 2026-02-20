import styles from "./styles.module.css";
import { BoardGame } from "@/types/boardgame";
import { BoardGameCard } from "../Card/Card";
import Spinner from "../Spinner/Spinner";

type CardsWrapperProps = {
  data: BoardGame[] | null;
};

const CardsWrapper = ({ data }: CardsWrapperProps) => {
  return (
    <div className={styles.main}>
      {data ? (
        data.slice(100, 200).map((d) => {
          return <BoardGameCard key={d._id} game={d} />;
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CardsWrapper;
