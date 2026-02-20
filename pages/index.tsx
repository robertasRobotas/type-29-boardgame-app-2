import cookie from "js-cookie";
import CardsWrapper from "@/components/CardsWrapper/CardsWrapper";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { userTokenKey } from "@/constants/user";
import { useRouter } from "next/router";
import axios from "axios";
import Footer from "@/components/Footer/Footer";
import PageTemplate from "@/components/PageTemplate/PageTemplate";

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
      await axios.get("http://localhost:3002/jwt/validate", {
        headers: {
          Authorization: token,
        },
      });

      if (!token) {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
      router.push("/login");
    }
  };

  const fetchBoardgames = async () => {
    try {
      const response = await axios.get("http://localhost:3002/boardgames", {
        headers: {
          Authorization: cookie.get(userTokenKey),
        },
      });
      console.log("response", response);
      setBoardgames(response.data.boardgames);
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
