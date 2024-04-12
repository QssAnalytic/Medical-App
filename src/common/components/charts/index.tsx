import { useRef } from "react";
import { LineChart, CartesianGrid, XAxis, YAxis, Line, DotProps } from "recharts";

interface HospitalStatistics {
  date: string;
  data: number;
}

interface HospitalInfo {
  hospital__name: string;
  statistics: HospitalStatistics[];
}

interface ChartProps {
  chartsInfo?: HospitalInfo[];
}

export default function Chart({ chartsInfo }: ChartProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const chartData: any[] = [];

  chartsInfo?.[0]?.statistics.forEach((month) => {
    const monthData: any = {
      name: month.date,
    };

    chartsInfo.forEach((hospital) => {
      monthData[hospital.hospital__name] = hospital?.statistics?.find((stat) => stat.date === month.date)?.data;
    });

    chartData.push(monthData);
  });

  return (
    <div className="relative">
      <div
        className="tooltip absolute border shadow rounded-md bg-gray-50 w-64 h-16 p-2 z-50 text-sm text-prettier break-all"
        ref={tooltipRef}
        hidden></div>
      <LineChart
        className="relative"
        width={500}
        height={350}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval="preserveStartEnd" />
        <YAxis width={30} />

        {chartsInfo?.map((hospital: HospitalInfo) => (
          <Line
            key={hospital.hospital__name}
            type="monotone"
            dot={{
              onMouseMove: (e: DotProps & { dataKey: string; value: number }) => {
                if (tooltipRef.current) {
                  tooltipRef.current.hidden = false;
                  const value = e.value;
                  const x = e.cx;
                  const y = e.cy;

                  console.log("ee", e);

                  tooltipRef.current.innerHTML = `<p>Hospital : ${e.dataKey}</p> <p>Price : ${value}</p>`;
                  if (tooltipRef.current.style) {
                    tooltipRef.current.style.top = `${(y || 0) - 72}px`;
                    tooltipRef.current.style.left = `${x}px`;
                  }
                }
              },
              onMouseLeave: () => {
                if (tooltipRef.current) {
                  tooltipRef.current.hidden = true;
                }
              },
            }}
            dataKey={hospital.hospital__name}
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
          />
        ))}
      </LineChart>
    </div>
  );
}
