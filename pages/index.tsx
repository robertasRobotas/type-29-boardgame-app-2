import CardsWrapper from "@/components/CardsWrapper/CardsWrapper";
import Header from "@/components/Header/Header";
import { boardgames } from "../data/boardgames";

const Index = () => {
  console.log("boardgames", boardgames);

  return (
    <>
      <Header logo={"TYPE 29"} />
      <CardsWrapper data={boardgames} />
    </>
  );
};

export default Index;
