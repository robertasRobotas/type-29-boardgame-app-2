import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm/LoginForm";
import axios from "axios";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { userTokenKey } from "@/constants/user";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { login, validateJwtToken } from "@/api/user";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateJwt = async () => {
    const token = cookie.get(userTokenKey);

    try {
      const response = await validateJwtToken(token!, router);

      if (response?.status === 200) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    validateJwt();
  }, []);

  const onFormSubmit = async () => {
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await login(data);

      if (response.status === 200) {
        cookie.set(userTokenKey, response.data.jwt);
        router.push("/");
      }

      console.log("response", response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageTemplate>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onFormSubmit={onFormSubmit}
      />
    </PageTemplate>
  );
};

export default Login;
