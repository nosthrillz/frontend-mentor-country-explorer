import { useContext } from "react";
import { ThemeContext } from "../../features/ThemeContext";
import styles from "./ButtonPaginate.module.scss";

const ButtonPaginate = ({ children, onClick, disabled }) => {
  const theme = useContext(ThemeContext);
  const darkTheme = theme.state.darkTheme;

  const buttonClasses = buttonClass(darkTheme);

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default ButtonPaginate;

const buttonClass = (isDark) => {
  return isDark ? styles.button + " " + styles.dark : styles.button;
};
