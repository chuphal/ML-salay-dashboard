import React, { useState } from "react";
import { Table } from "antd";
import useFetch from "../hooks/useFetch";
import { ColumnsType } from "antd/es/table";
import _ from "lodash";
import { Spin } from "antd";

const MainTable: React.FC = () => {
  const { loading, totalData } = useFetch();
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedYearData, setSelectedYearData] = useState<any[]>([]);

  const result = _(totalData)
    .groupBy("work_year")
    .map((work_year, year) => ({
      arr: work_year,
      year: Number(year),
      totalJobs: _.countBy(totalData, "work_year")[year],
      totalSalary: _.sumBy(work_year, "salary"),
    }))
    .value();

  const newResult = result.filter((res) => !isNaN(res.year));
  const data = newResult.map((item) => ({
    year: item.year,
    totalJobs: item.totalJobs,
    averageSalary: Math.floor(item.totalSalary / item.totalJobs),
  }));

  const insideTableData = newResult.map((item) => {
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

  interface SalaryData {
    year: number;
    totalJobs: number;
    averageSalary: number;
  }

  const columns: ColumnsType<SalaryData> = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year - b.year,
      onCell: (record) => ({
        onClick: () => setSelectedYear(record.year),
      }),
    },
    {
      title: "Total Jobs",
      dataIndex: "totalJobs",
      key: "totalJobs",
      sorter: (a, b) => a.totalJobs - b.totalJobs,
    },
    {
      title: "Average Salary (USD)",
      dataIndex: "averageSalary",
      key: "averageSalary",
      sorter: (a, b) => a.averageSalary - b.averageSalary,
    },
  ];

  const handleExpand = (expanded: any, record: any) => {
    if (expanded | selectedYear) {
      setSelectedYear(record.year);

      const data = insideTableData[record.year - 2020];

      const newData = data.map((item) => ({
        jobTitle: item.jobTitle,
        countJobs: item.countJobs,
        averageSalary: Math.floor(item.totalSalary / item.countJobs),
      }));

      setSelectedYearData(newData);
    }
  };

  interface DetailedSalaryData {
    jobtitle: string;
    countJobs: number;
    averageSalary: number;
  }

  const detailsColumns: ColumnsType<DetailedSalaryData> = [
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "job_title",
    },
    {
      title: "Number of Jobs",
      dataIndex: "countJobs",
      key: "countJobs",
      sorter: (a, b) => a.countJobs - b.countJobs,
    },
    {
      title: "Avg. Salary (USD)",
      dataIndex: "averageSalary",
      key: "averageSalary",
      sorter: (a, b) => a.averageSalary - b.averageSalary,
    },
  ];

  return (
    <>
      {loading ? (
        <div className="loader">
          <Spin size={"large"} />
        </div>
      ) : (
        <Table
          columns={columns}
          expandable={{
            expandRowByClick: true,
            onExpand: (expanded, record) => handleExpand(expanded, record),
            expandIcon: () => <></>,
            expandedRowRender: () => (
              <Table
                columns={detailsColumns}
                dataSource={selectedYearData}
                rowKey="job_title"
                pagination={{ position: ["bottomCenter"] }}
              />
            ),
          }}
          dataSource={data}
          rowKey="year"
          pagination={false}
        />
      )}
    </>
  );
};

export default MainTable;
