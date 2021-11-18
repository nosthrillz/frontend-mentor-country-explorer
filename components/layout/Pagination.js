import { useEffect, useState } from "react";
import ButtonPaginate from "../ui/ButtonPaginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ data, from, setFrom, to, setTo }) => {
  const defaultStep = 10;

  const nextPage = (btnStep) => {
    if (btnStep == data.length) {
      setFrom(data.length - defaultStep);
      setTo(data.length);
    } else {
      if (from + 2 * btnStep > data.length) {
        setFrom(from + btnStep);
        setTo(data.length);
      } else {
        setFrom(from + btnStep);
        setTo(to + btnStep);
      }
    }
  };

  const previousPage = (btnStep) => {
    if (btnStep === 0) {
      setFrom(0);
      setTo(defaultStep);
    } else {
      if (from - btnStep < 0) {
        setFrom(0);
        setTo(btnStep);
      } else {
        setFrom(from - btnStep);
        setTo(to - btnStep);
      }
    }
  };

  return (
    <div className={styles.paginationWrapper}>
      <ButtonPaginate
        onClick={() => previousPage(0)}
        disabled={from - 1 < 0}
      >{`|<`}</ButtonPaginate>
      <ButtonPaginate
        onClick={() => previousPage(10)}
        disabled={from - 10 < 0}
      >{`<`}</ButtonPaginate>
      <div className={styles.results}>
        <span>Showing results</span>
        <strong>
          {from}-{to < data.length ? to : data.length}/{data.length}
        </strong>
      </div>
      <ButtonPaginate
        onClick={() => nextPage(10)}
        disabled={to + 10 > data.length}
      >{`>`}</ButtonPaginate>
      <ButtonPaginate
        onClick={() => nextPage(data.length)}
        disabled={to + 1 > data.length}
      >{`>|`}</ButtonPaginate>
    </div>
  );
};

export default Pagination;
