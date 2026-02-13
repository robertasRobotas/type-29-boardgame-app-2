import styles from "./styles.module.css";
import { BoardGame } from "@/types/boardgame";
import { BoardGameCard } from "../Card/Card";

type CardsWrapperProps = {
  data: BoardGame[];
};

const CardsWrapper = ({ data }: CardsWrapperProps) => {
  return (
    <div className={styles.main}>
      {data &&
        data
          .slice(100, 200)
          .sort((a, b) => {
            return a.difficulty - b.difficulty;
          })
          .filter((g) => {
            return g.ratingsCount >= 10000;
          })
          .filter((g) => {
            return g.maxAvailableForPeopleNumber >= 6;
          })
          .filter((g) => {
            if (g.recommendedStartingAge) {
              return g.recommendedStartingAge <= 10;
            } else {
              return false;
            }
          })
          .map((d) => {
            return <BoardGameCard key={d.title} game={d} />;
          })}
    </div>
  );
};

export default CardsWrapper;
