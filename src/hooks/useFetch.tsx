import _ from "lodash";
import Papa from "papaparse";
import { useEffect, useState } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);

    const fetchCsvData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/data/salaries.csv");
        const reader = response.body!.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csvString = decoder.decode(result.value!);
        const { data } = Papa.parse(csvString, {
          header: true,
          dynamicTyping: true,
        });
        const newresult = _(data)
          .groupBy("work_year")
          .map((work_year, year) => ({
            arr: work_year,
            year: Number(year),
            totalJobs: _.countBy(data, "work_year")[year],
            totalSalary: _.sumBy(work_year, "salary"),
          }))
          .value();

        const sortedData = newresult.filter((res) => !isNaN(res.year));
        setTotalData(sortedData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCsvData();
  }, []);

  return { loading, totalData };
};

export default useFetch;
