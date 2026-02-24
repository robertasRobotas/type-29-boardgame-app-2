import { userTokenKey } from "@/constants/user";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import cookies from "js-cookie";
import type { BoardGame } from "@/types/boardgame";
import styles from "./styles.module.css";
import { getBoardgameById, toggleBoardgame } from "@/api/boardgames";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const Game = () => {
  const router = useRouter();
  const [boardgame, setBoardgame] = useState<BoardGame | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBoardgame = async (id: string) => {
    try {
      const token = cookies.get(userTokenKey);
      const response = await getBoardgameById(token!, id);

      console.log("response", response);

      setBoardgame(response.data.boardgame);
    } catch (err) {
      console.log(err);
      setError("Failed to load board game.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const id = router.query.id;
    if (typeof id === "string") fetchBoardgame(id);
  }, [router.query.id]);

  const rating = useMemo(() => {
    if (!boardgame) return null;
    return clamp(boardgame.rating, 0, 10);
  }, [boardgame]);

  const saveBoardgame = async () => {
    try {
      const token = cookies.get(userTokenKey);

      const result = await toggleBoardgame(token!, router.query.id as string);

      if (result.status === 200) {
        fetchBoardgame(router.query.id as string);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* {isLoading && <div className={styles.state}>Loading…</div>} */}

        {!isLoading && error && (
          <div className={styles.stateError}>{error}</div>
        )}

        {!isLoading && !error && boardgame && (
          <article className={styles.card}>
            <header className={styles.header}>
              <div className={styles.imageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.image}
                  src={boardgame.imgUrl}
                  alt={boardgame.title}
                  loading="lazy"
                />
              </div>

              <div className={styles.headText}>
                <h1 className={styles.title}>{boardgame.title}</h1>
                <p className={styles.subtitle}>{boardgame.subtitle}</p>

                <div className={styles.badges}>
                  <span className={styles.badge}>{boardgame.releaseYear}</span>

                  <span className={styles.badge}>
                    {boardgame.minAvailableForPeopleNumber}–
                    {boardgame.maxAvailableForPeopleNumber} players
                  </span>

                  <span className={styles.badge}>
                    {boardgame.minPlayingTime}
                    {boardgame.maxPlayingTime
                      ? `–${boardgame.maxPlayingTime}`
                      : ""}{" "}
                    min
                  </span>

                  {boardgame.recommendedStartingAge != null && (
                    <span className={styles.badge}>
                      {boardgame.recommendedStartingAge}+
                    </span>
                  )}
                </div>
              </div>
            </header>

            <section className={styles.body}>
              <div className={styles.grid}>
                <div className={styles.stat}>
                  <div className={styles.label}>Rating</div>
                  <div className={styles.valueRow}>
                    <span className={styles.value}>{rating?.toFixed(1)}</span>
                    <span className={styles.muted}>/10</span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.muted}>
                      {boardgame.ratingsCount?.toLocaleString()} ratings
                    </span>
                  </div>

                  <div className={styles.progressWrap} aria-label="rating bar">
                    <div className={styles.progressBg} />
                    <div
                      className={styles.progressFg}
                      style={{ width: `${((rating ?? 0) / 10) * 100}%` }}
                    />
                  </div>
                </div>

                <div className={styles.stat}>
                  <div className={styles.label}>Best with</div>
                  <div className={styles.value}>
                    {boardgame.minBestPlayForPeopleNumber}–
                    {boardgame.maxBestPlayForPeopleNumber} players
                  </div>
                </div>

                <div className={styles.stat}>
                  <div className={styles.label}>Difficulty</div>
                  <div className={styles.value}>{boardgame.difficulty}/5</div>
                </div>

                <div className={styles.stat}>
                  <div className={styles.label}>Play time</div>
                  <div className={styles.value}>
                    {boardgame.minPlayingTime}
                    {boardgame.maxPlayingTime
                      ? `–${boardgame.maxPlayingTime}`
                      : ""}{" "}
                    min
                  </div>
                </div>
              </div>
            </section>

            <footer className={styles.footer}>
              <button
                className={styles.secondaryBtn}
                type="button"
                onClick={() => router.back()}
              >
                Back
              </button>

              <button
                className={styles.primaryBtn}
                type="button"
                onClick={() => saveBoardgame()}
              >
                {boardgame.isSavedToUser ? (
                  <>Remove from list</>
                ) : (
                  <>Add to list</>
                )}
              </button>
            </footer>
          </article>
        )}

        {!isLoading && !error && !boardgame && (
          <div className={styles.state}>No game found.</div>
        )}
      </div>
    </div>
  );
};

export default Game;
