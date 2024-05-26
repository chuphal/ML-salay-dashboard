import _ from "lodash";
import Papa from "papaparse";
import { useEffect, useState } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<any[]>([]);
  const [insideTableData, setInsideTableData] = useState<any[]>([]);

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
        const newData = _(data)
          .groupBy("work_year")
          .map((work_year, year) => ({
            arr: work_year,
            year: Number(year),
            totalJobs: _.countBy(data, "work_year")[year],
            totalSalary: _.sumBy(work_year, "salary"),
          }))
          .value();

        const newResult = newData.filter((res) => !isNaN(res.year));

        const sortedData = newResult.map((item) => ({
          year: item.year,
          totalJobs: item.totalJobs,
          averageSalary: Math.floor(item.totalSalary / item.totalJobs),
        }));

        const tableData = newResult.map((item) => {
          const array = _(item.arr)
            .groupBy("job_title")
            .map((job_title_arr, job_title) => ({
              jobTitle: job_title,
              countJobs: _.countBy(item.arr, "job_title")[job_title],
              totalSalary: _.sumBy(job_title_arr, "salary"),
            }))
            .value();

          return array;
        });

        setInsideTableData(tableData);
        setTotalData(sortedData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCsvData();
  }, []);

  return { loading, totalData, insideTableData };
};

export default useFetch;
