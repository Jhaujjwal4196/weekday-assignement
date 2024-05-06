/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { GiSandsOfTime } from "react-icons/gi";
import { filterJobs } from "@/utils/filterJobs";

const currencyMapping = {
  USD: "$",
  INR: "₹",
};

const limitMapping = {
  USD: "K",
  INR: "LPA",
};

const capitalizeFirstWord = (str) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

function JobCards({ data: fetchedData = [], filters }) {
  const [data, setData] = useState(fetchedData);

  useEffect(() => {
    if (filters) setData(filterJobs(fetchedData, filters));
    else setData(fetchedData);
  }, [filters, fetchedData]);

  return (
    <div className={styles.card_container}>
      {(data || []).map(
        ({
          jdUid = "",
          logoUrl = "",
          jobRole = "",
          companyName = "",
          location = "",
          jobDetailsFromCompany = "",
          minExp = 1,
          maxJdSalary = 0,
          minJdSalary,
          salaryCurrencyCode,
          skills = [],
        }) => (
          <div key={jdUid} className={styles.card_body}>
            <div className={styles.pill}>
              <GiSandsOfTime />
              Posted 17 days ago
            </div>

            <div className={styles.logo_name}>
              <img
                alt="logo"
                src={logoUrl}
                height="41px"
                style={{ borderRadius: "6px" }}
              ></img>
              <div>
                <div>
                  <div className={styles.label}>
                    {capitalizeFirstWord(companyName)}
                  </div>
                  <div>{capitalizeFirstWord(jobRole)}</div>
                </div>
                <p style={{ fontSize: "12px", marginTop: "4px" }}>
                  {capitalizeFirstWord(location)}
                </p>
              </div>
            </div>

            <div className={styles.salary_text}>
              Estimated Salary: {currencyMapping[salaryCurrencyCode]}
              {minJdSalary}
              {minJdSalary && "-"}
              {maxJdSalary} {limitMapping[salaryCurrencyCode]} ✅
            </div>

            <div className={styles.role_description}>
              <div>
                <div className={styles.heading}>About Role</div>
                <div className={styles.box}>
                  <p style={{ fontWeight: "600", lineHeight: "1.6" }}>
                    About Us
                  </p>
                  <span style={{ fontWeight: "400" }}>
                    {jobDetailsFromCompany}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.view_job}>
              <a>View Job</a>
            </div>
            {skills.length ? (
              <div>
                <div className={styles.label}>Skills</div>
                <div className={styles.skills_section}>
                  {(skills || [])?.map((it) => (
                    <div key={it} className={styles.skill_pill}>
                      it
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {minExp ? (
              <div>
                <div className={styles.label}>Minimum Experience</div>
                <div>{minExp} Years</div>
              </div>
            ) : null}

            <button className={styles.easy_apply}>Easy Apply</button>
          </div>
        )
      )}
    </div>
  );
}

export default JobCards;
