import Image from "next/image";
import { useCallback, useContext, useEffect } from "react";
import styles from "./Layout.module.scss";
import { ThemeContext } from "../features/ThemeContext";
import themeDarkIcon from "../images/themeDark.svg";
import themeLightIcon from "../images/themeLight.svg";

const Layout = ({ children }) => {
  const theme = useContext(ThemeContext);
  const darkTheme = theme.state.darkTheme;

  const headerClasses = headerClass(darkTheme);
  const mainClasses = mainClass(darkTheme);
  const buttonClasses = buttonClass(darkTheme);

  const switchTheme = () => {
    if (darkTheme) {
      theme.dispatch({ type: "light" });
    } else {
      theme.dispatch({ type: "dark" });
    }
  };

  const updateBodyTheme = useCallback(() => {
    const body = document.querySelector("body");
    darkTheme ? (body.className = "dark") : (body.className = "light");
  }, [darkTheme]);

  useEffect(() => {
    updateBodyTheme();
  }, [updateBodyTheme]);

  return (
    <>
      <header className={headerClasses}>
        <h1>Where in the world?</h1>
        <div className={styles.themeSwitcher}>
          <Image
            src={darkTheme ? themeDarkIcon : themeLightIcon}
            alt="theme switch icon"
            width={24}
            height={24}
          />
          <button onClick={switchTheme} className={buttonClasses}>
            {darkTheme ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>
      <main className={mainClasses}>{children}</main>
    </>
  );
};

export default Layout;

const headerClass = (isDark) => {
  return isDark
    ? styles.headerWrapper + " " + styles.darkHeader
    : styles.headerWrapper;
};

const mainClass = (isDark) => {
  return isDark
    ? styles.mainWrapper + " " + styles.darkBkg
    : styles.mainWrapper;
};

const buttonClass = (isDark) => {
  return isDark ? styles.button + " " + styles.dark : styles.button;
};
