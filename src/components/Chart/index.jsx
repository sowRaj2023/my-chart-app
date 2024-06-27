import { useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ResponsiveContainer,
} from "recharts";
import * as htmlToImage from "html-to-image";

import style from "./style.module.css";

// eslint-disable-next-line react/prop-types
const Chart = ({ data, callback, period }) => {
  const chartRef = useRef(null);

  const exportChart = () => {
    const chart = chartRef.current;
    if (chart) {
      htmlToImage
        .toPng(chart)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "chart.png";
          link.click();
        })
        .catch((error) => {
          console.error("Failed to export chart as PNG:", error);
        });
    }
  };

  return (
    <div className={style.container}>
      <div ref={chartRef} className={style.wrapper}>
        <ResponsiveContainer width="100%" height={600}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey={Object.keys(data[0])[0]} />
            <YAxis
              dataKey={"value"}
              label={{
                value: "Value",
                angle: -90,
              }}
            />
            <Tooltip />
            <Line type="monotone" dataKey={"value"} stroke="#8884d8" />
            <Brush />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button className={style.btn} onClick={exportChart}>Export as PNG</button>

      <select className={style.select} onChange={callback} value={period}>
        <option value={"daily"}>Daily</option>
        <option value={"weekly"}>Weekly</option>
        <option value={"monthly"}>Monthly</option>
      </select>
    </div>
  );
};

export default Chart;
