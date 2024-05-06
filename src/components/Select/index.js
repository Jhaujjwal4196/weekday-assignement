import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import styles from "./styles.module.css";

export default function Select({
  isAsync = false,
  callBack = () => {},
  multiple = false,
  placeholder = "Select",
  options = [],
  filterKey = "",
  filters = {},
  setFilters = () => {},
}) {
  const [selectedState, setSelected] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (val) => {
    console.log({ val });
  };

  const filteredOptions = (options || []).filter(
    ({ value = "" }) =>
      String(value).toLowerCase().includes(inputVal.toLowerCase()) &&
      !selectedState.includes(value)
  );

  const handleInputChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowOptions(true);
    setInputVal(e.target.value);
  };

  const handleDropdownClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowOptions((pv) => !pv);
  };

  const handleSelect = (e, rest) => {
    e.preventDefault();
    if (multiple) setSelected([...selectedState, rest.value]);
    else setSelected([rest.value]);
    setInputVal("");
    if (!multiple) setShowOptions(false);
  };

  const handlePillClick = (e, pillValue) => {
    e.preventDefault();
    e.stopPropagation();
    const afterDeletion = selectedState.filter((it) => it !== pillValue);
    setSelected(afterDeletion);
  };

  const clearAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelected([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Backspace" && selectedState?.length && !inputVal) {
      setSelected((pv) => {
        return pv.length === 1 ? [] : pv.slice(1);
      });
    }
  };

  useEffect(() => {
    setFilters((prevFilters) => {
      return { ...prevFilters, [filterKey]: selectedState };
    });
  }, [selectedState, filterKey, setFilters]);

  useEffect(() => {
    callBack();
  }, [isAsync && inputVal]);

  return (
    <div>
      <div
        className={styles.flex_center}
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            margin: "4px 0px",
            visibility: selectedState.length ? "visible" : "hidden",
          }}
        >
          {placeholder}
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.component}>
            <button
              onClick={handleDropdownClick}
              className={styles.styled_drop_button}
              onKeyUp={handleKeyPress}
            >
              {multiple ? (
                selectedState.map((it) => (
                  <div className={styles.pill} key={it}>
                    <div key={it}>{it}</div>
                    <button
                      onClick={(e) => {
                        handlePillClick(e, it);
                      }}
                      className={styles.button_pill}
                    >
                      <RxCross2 />
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ marginLeft: "10px" }}>{selectedState?.[0]}</div>
              )}
              <div className={styles.flex_center}>
                <input
                  name="select"
                  type="text"
                  placeholder={selectedState.length ? "" : placeholder}
                  value={inputVal}
                  onChange={handleInputChange}
                ></input>
                <div onClick={clearAll} className={styles.button_pill}>
                  <RxCross2 />
                </div>
                <div className={styles.hr} />
                <IoIosArrowDown
                  style={
                    showOptions
                      ? {
                          transition: "transform 0.3s ease-in-out",
                          transform: "rotate(180deg)",
                        }
                      : {
                          transition: "transform 0.3s ease-in-out",
                        }
                  }
                />
              </div>
            </button>
          </div>
          <div
            className={`${styles.list} flex flex-col`}
            style={
              showOptions
                ? {
                    opacity: 1,
                    maxHeight: "216px",
                    transition: "max-height  0.3s ease-in-out",
                  }
                : {
                    opacity: 0,
                    maxHeight: "0px",
                    transition: "max-height  0.3s ease-in-out",
                  }
            }
          >
            {(filteredOptions || []).length ? (
              filteredOptions.map(({ label, ...rest }) => (
                <button
                  key={label}
                  onClick={(e) => {
                    handleSelect(e, rest);
                  }}
                >
                  {label}
                </button>
              ))
            ) : (
              <button disabled>No Options found!!</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
