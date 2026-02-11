import axios from "axios";
import CardsWrapper from "@/components/CardsWrapper/CardsWrapper";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { DataType } from "@/types/data";

const Index = () => {
  const links = [
    { title: "About", href: "/about" },
    { title: "Main", href: "/main" },
    { title: "Portfolio", href: "/portfolio" },
  ];

  const [data, setData] = useState<null | DataType>(null);

  const fetchData = async () => {
    const response = await axios.get(
      "https://695dfc9f2556fd22f676eeca.mockapi.io/games",
    );
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header logo={"TYPE 29"} links={links} />
      <CardsWrapper data={data} />
    </>
  );
};

export default Index;
