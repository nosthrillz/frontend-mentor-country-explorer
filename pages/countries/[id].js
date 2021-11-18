import Head from "next/head";
import router, { useRouter } from "next/router";
import { ThemeContext } from "../../features/ThemeContext";
import { useContext } from "react";
import styles from "../../styles/Details.module.scss";

import { populationFormat } from "../../utils/populationFormat";

const Details = ({ data, neighbors }) => {
  const router = useRouter();
  const theme = useContext(ThemeContext);
  const darkTheme = theme.state.darkTheme;

  const buttonClasses = darkTheme
    ? styles.button + " " + styles.dark
    : styles.button;
  const neighborButtonClasses = darkTheme
    ? styles.neighborButton + " " + styles.dark
    : styles.neighborButton;

  if (data.status == 404)
    return (
      <>
        <Head>
          <title>Where in the world?</title>
          <meta
            name="description"
            content={`Details page not found. "Where in the world?" app`}
          />
        </Head>

        <div className={styles.detailsWrapper}>
          <button className={buttonClasses} onClick={() => router.back()}>
            {`<`}-- Back{" "}
          </button>
        </div>
        <h1>Something went wrong...</h1>
      </>
    );

  const capital = data.capital || "N/A";
  const topLevelDomain = data.topLevelDomain || "N/A";
  const currencies = data.currencies || "N/A";
  const { flag, name, region, subregion, languages, nativeName } = data;
  const population = populationFormat(data.population);

  const objectToDomComma = (object) => {
    if (object === "N/A") return <li>{object}</li>;
    return object?.map((item, idx) => (
      <li key={idx}>
        {item.name}
        {object.length !== idx + 1 && ","}
      </li>
    ));
  };

  const countriesToDom = (object) => {
    if (object?.length === 0) return "No neighboring countries";
    return object?.map((item, idx) => (
      <li
        key={idx}
        onClick={() => router.push(item.name)}
        className={neighborButtonClasses}
      >
        {item.name}
      </li>
    ));
  };

  return (
    <>
      <Head>
        <title>{name} - Where in the world?</title>
        <meta
          name="description"
          content={`Details page for ${name}. "Where in the world?" app`}
        />
      </Head>
      <div className={styles.detailsWrapper}>
        <button className={buttonClasses} onClick={() => router.replace("/")}>
          {`<`}-- Back{" "}
        </button>
        <div className={styles.content}>
          <img src={flag} alt={name + " flag"} />
          <div className={styles.countryDetails}>
            <h1 className={styles.countryTitle}>{name}</h1>
            <div className={styles.countryColumns}>
              <ul className={styles.countryDetail}>
                <li>
                  <strong>Native name: </strong>
                  {nativeName}
                </li>
                <li>
                  <strong>Population: </strong>
                  {population}
                </li>
                <li>
                  <strong>Region: </strong>
                  {region}
                </li>
                <li>
                  <strong>Sub-region: </strong>
                  {subregion}
                </li>
                <li>
                  <strong>Capital: </strong>
                  {capital}
                </li>
              </ul>
              <ul className={styles.countryDetail}>
                <li>
                  <strong>Top-level domain: </strong>
                  {topLevelDomain}
                </li>
                <li>
                  <strong>Currencies: </strong>
                  <ul>{objectToDomComma(currencies)}</ul>
                </li>
                <li>
                  <strong>Languages: </strong>
                  <ul>
                    <ul>{objectToDomComma(languages)}</ul>
                  </ul>
                </li>
              </ul>
            </div>
            <div className={styles.countryNeighbors}>
              <p>Border countries:</p>
              <ul>
                <ul>{countriesToDom(neighbors)}</ul>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;

export async function getStaticPaths() {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();

  const paths = countries.map((country) => ({
    params: { id: country.name },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://restcountries.com/v2/name/${params.id}`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
      details: params,
    };
  }

  if (!data[0]) {
    return {
      props: { data },
    };
  }

  let neighbors = [];

  if (data[0].hasOwnProperty("borders")) {
    for (let neighbor of data[0].borders) {
      const result = await fetch(
        `https://restcountries.com/v2/alpha/${neighbor}`
      );
      const neighborsResults = await result.json();
      neighbors.push(neighborsResults);
    }
  }

  return {
    props: { data: data[0], neighbors },
  };
}
