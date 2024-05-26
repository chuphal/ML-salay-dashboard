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
        setTotalData(data);
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
