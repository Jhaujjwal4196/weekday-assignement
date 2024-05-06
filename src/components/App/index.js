import React, { useState } from "react";
import styles from "./styles.module.css";
import useFetchData from "@/hooks/useFetchData";
import JobCards from "../JobCards";
import Filters from "../Filters";

function App() {
  const { data: fetchedData = [] } = useFetchData();

  const [data, setData] = useState(fetchedData);

  const [filters, setFilters] = useState({
    roles: [],
    numberOfEmployees: [],
    experience: [],
    remote: [],
    basePay: [],
    companyName: "",
  });

  return (
    <div className={styles.main_container}>
      <Filters filters={filters} setFilters={setFilters} />
      <JobCards data={fetchedData} filters={filters} setFilters={setFilters} />
    </div>
  );
}

export default App;
