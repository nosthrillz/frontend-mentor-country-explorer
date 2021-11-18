import styles from "./Filters.module.scss";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../features/ThemeContext";
import searchDarkIcon from "../../images/searchDark.svg";
import searchLightIcon from "../../images/searchLight.svg";

const Filters = ({ onSearch, onRegion, regions }) => {
  const theme = useContext(ThemeContext);
  const darkTheme = theme.state.darkTheme;
  const clearFilterText = "Clear filter...";
  const defaultRegionDropdownText = "Filter by region";

  const [regionDropdownText, setRegionDropdownText] = useState(
    defaultRegionDropdownText
  );
  const [region, setRegion] = useState();
  const [showFilter, setShowFilter] = useState(false);

  const inputClasses = darkTheme
    ? styles.input + " " + styles.dark
    : styles.input;

  const regionTitleClasses = darkTheme
    ? styles.regionTitle + " " + styles.dark
    : styles.regionTitle;
  const regionListClasses = darkTheme
    ? styles.regionList + " " + styles.dark
    : styles.regionList;

  const searchHandler = (e) => {
    onSearch(e.target.value);
  };

  useEffect(() => {
    if (region === clearFilterText) {
      setRegion();
      setRegionDropdownText(defaultRegionDropdownText);
      onRegion();
    } else if (!!region) {
      setRegionDropdownText("Region: " + region);
      onRegion(region);
    }
  }, [region, onRegion]);

  const regionSelectHandler = (item) => {
    setRegion(item);
    setShowFilter(false);
    setRegionDropdownText(defaultRegionDropdownText);
  };

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.searchWrapper}>
        <img
          src={darkTheme ? searchDarkIcon.src : searchLightIcon.src}
          alt=""
          className={styles.icon}
        />
        <input
          className={inputClasses}
          placeholder="Search for a country..."
          onChange={searchHandler}
        />
      </div>
      <div className={styles.dropdownWrapper}>
        <div
          className={regionTitleClasses}
          onClick={() => setShowFilter(!showFilter)}
        >
          <p>{regionDropdownText}</p>
          <button>^</button>
        </div>
        {showFilter && (
          <ul className={regionListClasses}>
            {[!!region && clearFilterText, ...regions].map((item, idx) => (
              <li key={idx} onClick={() => regionSelectHandler(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filters;
