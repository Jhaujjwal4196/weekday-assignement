import { MinBasePay, MiniumExperince, Remote, Roles } from "@/data/roles";
import styles from "./styles.module.css";
import React from "react";
import Select from "../Select";

function Filters({}) {
  const Exp = [...Array(10).keys()].map((it) => ({
    label: `${(it + 1) * 10}L`,
    value: (it + 1) * 10,
  }));

  console.log({ Exp });

  const FILTER_BUCKETS = [
    { label: "Roles", value: Roles, multiple: true },
    { label: "Minimum Experience", value: MiniumExperince, multiple: false },
    { label: "Remote", value: Remote, multiple: true },
    { label: "Minimum Base Pay", value: MinBasePay, multiple: false },
  ];

  return (
    <div>
      <div>Filters</div>
      <div className={styles.filter_wrapper}>
        {FILTER_BUCKETS.map(({ label = "", value, multiple }) => {
          return (
            <Select
              key={label}
              placeholder={label}
              options={value}
              multiple={multiple}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Filters;
