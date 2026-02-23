export type BoardGame = {
  _id: string;
  title: string;
  subtitle: string;
  imgUrl: string;
  rating: number;
  releaseYear: number;
  minAvailableForPeopleNumber: number;
  maxAvailableForPeopleNumber: number;
  minBestPlayForPeopleNumber: number;
  maxBestPlayForPeopleNumber: number;
  recommendedStartingAge: number | null;
  difficulty: number;
  ratingsCount: number;
  minPlayingTime: number;
  maxPlayingTime: number | null;
  isSavedToUser: boolean;
};
