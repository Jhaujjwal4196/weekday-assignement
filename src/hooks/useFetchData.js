import { useEffect, useState } from "react";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    limit: 10,
    offset: offset,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );
        const json = await response.json();
        setData((prevData) => {
          const newData = json?.jdList.filter(
            (newItem) =>
              !prevData.some((oldItem) => oldItem.jdUid === newItem.jdUid)
          );
          return [...prevData, ...newData];
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        setOffset(offset + 10);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return { data };
};

export default useFetchData;
