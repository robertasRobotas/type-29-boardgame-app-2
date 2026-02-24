import cookie from "js-cookie";
import CardsWrapper from "@/components/CardsWrapper/CardsWrapper";
import { useEffect, useState } from "react";
import { userTokenKey } from "@/constants/user";
import { useRouter } from "next/router";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { validateJwtToken } from "@/api/user";
import { getAllBoardgames } from "@/api/boardgames";

const Index = () => {
  const router = useRouter();

  const [boardgames, setBoardgames] = useState(null);

  const validateJwt = async () => {
    const token = cookie.get(userTokenKey);

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      validateJwtToken(token, router);
    } catch (err) {
      console.log(err);
      router.push("/login");
    }
  };

  const fetchBoardgames = async () => {
    try {
      const token = cookie.get(userTokenKey) as string;

      const response = await getAllBoardgames(token);

      setBoardgames(response?.data.boardgames);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    validateJwt();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBoardgames();
  }, []);

  return (
    <PageTemplate>
      <CardsWrapper data={boardgames} />
    </PageTemplate>
  );
};

export default Index;
