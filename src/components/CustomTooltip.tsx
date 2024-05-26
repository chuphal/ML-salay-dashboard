import { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    payload[0].chartType = "LineChart";

    return (
      <div className="custom-tooltip tooltip-work">
        <p className="label">
          <b>Year : </b>
          {` ${payload[0].payload.year}`}
        </p>
        <p className="label">
          <b>Jobs : </b>
          {` ${payload[0].payload.totalJobs}`}
        </p>
        <p className="desc">
          {" "}
          <b>Avg. Salary (USD) :</b>
          {`${payload[0].payload.averageSalary}`}
        </p>
      </div>
    );
  }
};

export default CustomTooltip;
