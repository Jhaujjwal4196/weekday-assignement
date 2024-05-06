import { MinBasePay, MiniumExperince, Remote, Roles } from "@/data/roles";
import styles from "./styles.module.css";
import React from "react";
import Select from "../Select";

function Filters({ filters = {}, setFilters }) {
  const FILTER_BUCKETS = [
    { label: "Roles", value: Roles, multiple: true, filterKey: "roles" },
    {
      label: "Minimum Experience",
      value: MiniumExperince,
      multiple: false,
      filterKey: "experience",
    },
    { label: "Remote", value: Remote, multiple: true, filterKey: "remote" },
    {
      label: "Minimum Base Pay",
      value: MinBasePay,
      multiple: false,
      filterKey: "basePay",
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
      </div>
    </div>
  );
}

export default Filters;
