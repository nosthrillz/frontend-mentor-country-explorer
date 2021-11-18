import { useEffect, useState } from "react";
import Card from "../ui/Card";
import styles from "./CardList.module.scss";
import Pagination from "../layout/Pagination";

import { populationFormat } from "../../utils/populationFormat";

const CardList = ({ countries, searchFilter, regionFilter }) => {
  const defaultStep = 10;
  const [listData, setListData] = useState(countries);
  const [fromPage, setFromPage] = useState(0);
  const [toPage, setToPage] = useState(defaultStep);

  useEffect(() => {
    setListData(filteredCountries(countries, searchFilter, regionFilter));
    setFromPage(0);
    setToPage(countries.length < defaultStep ? countries.length : defaultStep);
  }, [countries, searchFilter, regionFilter]);

  return (
    <>
      <div className={styles.cardListWrapper}>
        {listData.slice(fromPage, toPage).map((countryItem, idx) => (
          <Card
            key={idx}
            image={countryItem.flag}
            name={countryItem.name}
            population={populationFormat(countryItem.population) || "N/A"}
            region={countryItem.region || "N/A"}
            capital={countryItem.capital || "N/A"}
          />
        ))}
      </div>
      <Pagination
        data={listData}
        from={fromPage}
        setFrom={setFromPage}
        to={toPage}
        setTo={setToPage}
      />
    </>
  );
};

export default CardList;

const filteredCountries = (countries, searchFilter, regionFilter) => {
  const regionFiltered = !!regionFilter
    ? countries.filter(
        (item) => item.region.toLowerCase() === regionFilter.toLowerCase()
      )
    : countries;
  return !!searchFilter
    ? regionFiltered.filter(
        (item) =>
          item.name.toLowerCase().indexOf(searchFilter.toLowerCase()) != -1
      )
    : regionFiltered;
};

const getPaginateIndex = (array) => {};
