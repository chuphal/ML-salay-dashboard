import React from "react";
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
import { Spin } from "antd";

const Analytics: React.FC = () => {
  const { loading, totalData } = useFetch();

  const newResult = totalData;

  const data = newResult.map((item: any) => ({
    year: item.year,
    totalJobs: item.totalJobs,
    averageSalary: Math.floor(item.totalSalary / item.totalJobs),
  }));

  return (
    <div>
      {loading ? (
        <div className="loader">
          <Spin size={"large"} />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Analytics;
