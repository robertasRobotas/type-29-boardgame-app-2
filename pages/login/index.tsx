import { useState } from "react";
import styles from "./styles.module.css";
import LoginForm from "@/components/LoginForm/LoginForm";
import axios from "axios";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { userTokenKey } from "@/constants/user";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = async () => {
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:3002/login", {
        ...data,
      });

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
    <div className={styles.main}>
      <h1>Login</h1>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onFormSubmit={onFormSubmit}
      />
    </div>
  );
};

export default Login;
