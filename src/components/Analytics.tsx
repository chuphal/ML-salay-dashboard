import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import useFetch from "../hooks/useFetch";

const Analytics: React.FC = () => {
  const [totaldata, setTotalData] = useState<any[]>([]);
  const { fetchCsvData } = useFetch();

  useEffect(() => {
    fetchCsvData("/data/salaries.csv", setTotalData);
  }, []);

  const result = _(totaldata)
    .groupBy("work_year")
    .map((work_year_arr, year) => ({
      year: Number(year),
      totalJobs: _.countBy(totaldata, "work_year")[year],
      totalSalary: _.sumBy(work_year_arr, "salary"),
    }))
    .value();

  const newResult = result.filter((res) => !isNaN(res.year));
  console.log(newResult);
  const data = newResult.map((item: any) => ({
    year: item.year,
    totalJobs: item.totalJobs,
    averageSalary: Math.floor(item.totalSalary / item.totalJobs),
  }));

  return (
    <div>
      <ResponsiveContainer height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" allowDuplicatedCategory={false} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="totalJobs" stroke="#03AED2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
