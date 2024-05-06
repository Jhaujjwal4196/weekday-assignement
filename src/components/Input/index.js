import React from "react";
import styles from "./styles.module.css";

function Input({
  placeholder = "Type Here",
  filterKey = "",
  filters = {},
  setFilters = () => {},
}) {
  return (
    <div>
      <div
        style={{
          fontSize: "16px",
          margin: "4px 0px",
          visibility: filters[filterKey] ? "visible" : "hidden",
        }}
      >
        {placeholder}
      </div>
      <input
        value={filters[filterKey]}
        onChange={(e) => {
          setFilters((prevFilters) => {
            return { ...prevFilters, [filterKey]: e.target.value };
          });
        }}
        className={styles.component}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
