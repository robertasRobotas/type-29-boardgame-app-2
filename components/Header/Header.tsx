import styles from "./styles.module.css";

type HeaderProps = {
  logo: string;
};

const Header = ({ logo }: HeaderProps) => {
  const links = [
    { title: "About", href: "/about" },
    { title: "Main", href: "/main" },
    { title: "Login", href: "/login" },
  ];

  return (
    <header className={styles.main}>
      <div className={styles.logo}>{logo}</div>
      <nav>
        <ul>
          {links.map((l) => {
            return (
              <li key={l.href}>
                <a href={l.href}>{l.title}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
