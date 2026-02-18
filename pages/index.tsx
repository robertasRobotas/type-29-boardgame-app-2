import cookie from "js-cookie";
import CardsWrapper from "@/components/CardsWrapper/CardsWrapper";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { userTokenKey } from "@/constants/user";
import { useRouter } from "next/router";
import axios from "axios";

const Index = () => {
  const router = useRouter();

  const [boardgames, setBoardgames] = useState([]);

  const validateJwt = async () => {
    const token = cookie.get(userTokenKey);

    try {
      const response = await axios.get("http://localhost:3002/jwt/validate", {
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
    fetchBoardgames();
  }, []);

  return (
    <>
      <Header logo={"TYPE 29"} />
      <CardsWrapper data={boardgames} />
    </>
  );
};

export default Index;
