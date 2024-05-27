import React, { useState } from "react";
import { Table } from "antd";
import useFetch from "../hooks/useFetch";
import { ColumnsType } from "antd/es/table";
import _ from "lodash";
import { Spin } from "antd";

const MainTable: React.FC = () => {
  const { loading, totalData, insideTableData } = useFetch();
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedYearData, setSelectedYearData] = useState<any[]>([]);

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

      const arrangeData = async () => {
        try {
          const newData = await data.map((item: any) => ({
            jobTitle: item.jobTitle,
            countJobs: item.countJobs,
            averageSalary: Math.floor(item.totalSalary / item.countJobs),
          }));
          setSelectedYearData(newData);
        } catch (error) {
          console.log("error in handle expand", error);
        }
      };
      arrangeData();
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
          dataSource={totalData}
          rowKey="year"
          pagination={false}
        />
      )}
    </>
  );
};

export default MainTable;
