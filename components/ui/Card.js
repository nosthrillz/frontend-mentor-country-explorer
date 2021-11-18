import { useContext } from "react";
import styles from "./Card.module.scss";
import { ThemeContext } from "../../features/ThemeContext";
import router from "next/router";
import Image from "next/image";

const Card = ({ image, name, population, region, capital }) => {
  const theme = useContext(ThemeContext);
  const darkTheme = theme.state.darkTheme;

  const cardClasses = cardClass(darkTheme);

  const handleClick = () => {
    router.push(`/countries/${name}`);
  };

  return (
    <div className={cardClasses} onClick={handleClick}>
      <Image src={image} alt={name + " flag"} width={50} height={200} />
      <div>
        <p>{name}</p>
        <ul>
          <li>
            <strong>Population: </strong>
            {population}
          </li>
          <li>
            <strong>Region: </strong>
            {region}
          </li>
          <li>
            <strong>Capital: </strong>
            {capital}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Card;

const cardClass = (isDark) => {
  return isDark
    ? styles.cardWrapper + " " + styles.darkCard
    : styles.cardWrapper;
};
