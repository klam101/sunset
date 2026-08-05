"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ accounts }: DonutChartProps) => {
  const accountNames = accounts?.map((account: Account) => account.name);
  const balances = accounts?.map((account: Account) => account.currentBalance);
  
  const data = {
    datasets: [
      {
        label: "Banks",
        data: balances,
        backgroundColor: ["#B64107", "#D82295", "#FACB2F"],
      }
    ],
    labels: accountNames
  }

  return <Doughnut
    data={data}
    options={{
      cutout: "60%",
      plugins: {
        legend: {
          display: false
        }
      }
    }}
  />
}

export default DonutChart