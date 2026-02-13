import React from "react";
import styles from "./styles.module.css";
import { BoardGame } from "@/types/boardgame";

type Props = {
  game: BoardGame;
};

const formatCount = (n: number) => n.toLocaleString();

const formatTime = (min: number, max: number) =>
  min === max ? `${min} min` : `${min}–${max} min`;

const formatRange = (min: number, max: number) =>
  min === max ? `${min}` : `${min}–${max}`;

export const BoardGameCard: React.FC<Props> = ({ game }) => {
  return (
    <article
      className={styles.card}
      aria-label={`${game.title} board game card`}
    >
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={game.imgUrl}
          alt={game.title}
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <h3 className={styles.title}>{game.title}</h3>
          <p className={styles.subtitle}>{game.subtitle}</p>
        </header>

        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Rating</span>
            <span className={styles.metaValue}>
              {game.rating.toFixed(1)}{" "}
              <span className={styles.muted}>
                ({formatCount(game.ratingsCount)})
              </span>
            </span>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Year</span>
            <span className={styles.metaValue}>{game.releaseYear}</span>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Players</span>
            <span className={styles.metaValue}>
              {formatRange(
                game.minAvailableForPeopleNumber,
                game.maxAvailableForPeopleNumber,
              )}
              <span className={styles.muted}>
                {" "}
                · best{" "}
                {formatRange(
                  game.minBestPlayForPeopleNumber,
                  game.maxBestPlayForPeopleNumber,
                )}
              </span>
            </span>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Time</span>
            <span className={styles.metaValue}>
              {formatTime(game.minPlayingTime, game.maxPlayingTime)}
            </span>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Age</span>
            <span className={styles.metaValue}>
              {game.recommendedStartingAge}+
            </span>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Difficulty</span>
            <span className={styles.metaValue}>
              {game.difficulty.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
