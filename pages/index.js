import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.scss";

import Filters from "../components/layout/Filters";

import CardList from "../components/layout/CardList";

export default function Home({ data, regions }) {
  const [searchFilter, setSearchFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  return (
    <>
      <Head>
        <title>Where in the world?</title>
        <meta
          name="description"
          content="Where in the world? Country explorer"
        />
        <link rel="icon" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Filters
        onSearch={setSearchFilter}
        onRegion={setRegionFilter}
        regions={regions}
      />
      <CardList
        countries={data}
        searchFilter={searchFilter}
        regionFilter={regionFilter}
      />
    </>
  );
}

export async function getStaticProps(context) {
  const response = await fetch(`https://restcountries.com/v2/all`);
  const results = await response.json();

  // remove bugged Åland entry.
  // TODO further investigate why this fails in details
  const data = results.filter((result) => !result.name.includes("Åland"));

  const regions = [...new Set(data.map((item) => item.region))].sort((a, b) =>
    a < b ? -1 : 0
  );

  return {
    props: { data, regions },
  };
}
