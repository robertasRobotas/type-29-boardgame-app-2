import styles from "./styles.module.css";

type HeaderProps = {
  logo: string;
  links: { title: string; href: string }[];
};

const Header = ({ logo, links }: HeaderProps) => {
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
