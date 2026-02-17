import styles from "./styles.module.css";

type LoginFormProps = {
  email: string;
  setEmail: (x: string) => void;
  password: string;
  setPassword: (x: string) => void;
  onFormSubmit: () => void;
};

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  onFormSubmit,
}: LoginFormProps) => {
  return (
    <div>
      <div className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onFormSubmit}>Login</button>
      </div>
    </div>
  );
};

export default LoginForm;
