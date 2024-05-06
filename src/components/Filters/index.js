import { MinBasePay, MiniumExperince, Remote, Roles } from "@/data/roles";
import styles from "./styles.module.css";
import React from "react";
import Select from "../Select";
import Input from "../Input";

function Filters({ filters = {}, setFilters }) {
  const FILTER_BUCKETS = [
    { label: "Roles", value: Roles, multiple: true, filterKey: "jobRole" },
    {
      label: "Minimum Experience",
      value: MiniumExperince,
      multiple: false,
      filterKey: "minExp",
    },
    { label: "Remote", value: Remote, multiple: true, filterKey: "location" },
    {
      label: "Minimum Base Pay",
      value: MinBasePay,
      multiple: false,
      filterKey: "minJdSalary",
    },
  ];

  return (
    <div>
      <div>Filters</div>
      <div className={styles.filter_wrapper}>
        {FILTER_BUCKETS.map(({ label = "", value, multiple, filterKey }) => {
          return (
            <Select
              key={label}
              placeholder={label}
              options={value}
              multiple={multiple}
              filterKey={filterKey}
              filters={filters}
              setFilters={setFilters}
            />
          );
        })}
        <Input
          placeholder="Company Name"
          filterKey="companyName"
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </div>
  );
}

export default Filters;
