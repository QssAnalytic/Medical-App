import { colorsForHospital } from "@/common/static";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
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
  loading?: boolean;
}

export default function Chart({ chartsInfo, loading }: ChartProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const form = useFormContext();

  const chartData: any[] = [];

  // Data Manipulation for rechart`s line chart
  // !IMPORTANT must be optimized
  const uniqueDates = new Set(chartsInfo?.map(({ statistics }) => statistics.map((item) => item.date)).flat(1));
  [...uniqueDates]
    ?.sort((a: any, b: any) => a - b)
    ?.forEach((date: any) => {
      const monthData: any = {
        name: date,
      };
      chartsInfo?.forEach((hospital) => {
        monthData[hospital.hospital__name] =
          hospital?.statistics?.find((stat) => stat.date === monthData.name)?.data || 0;
      });

      chartData.push(monthData);
    });

  return (
    <div className="relative h-full">
      {chartsInfo?.length ? (
        <>
          <div
            className="  absolute border shadow rounded-md bg-gray-50 w-64 h-16 p-2 z-50 text-sm text-prettier break-all"
            ref={tooltipRef}
            hidden></div>
          {!loading ? (
            <LineChart
              className="relative"
              width={400}
              height={300}
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid horizontal={true} vertical={false} verticalFill={["#D9D9D9"]} />
              <XAxis dataKey="name" interval="preserveStartEnd" />
              <YAxis width={30} tickSize={1} />

              {chartsInfo?.map((hospital: HospitalInfo, idx: number) => (
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

                        tooltipRef.current.innerHTML = `<p>Hospital : ${e.dataKey}</p> <p>${form.watch(
                          "annotate_type",
                        )} : ${value}</p>`;
                        if (tooltipRef.current.style) {
                          tooltipRef.current.style.top = `${(y || 0) - 72}px`;
                          tooltipRef.current.style.left = `${x}px`;
                        }
                      }
                    },
                    onMouseLeave: () => {
                      if (tooltipRef.current) {chartsInfo
                        tooltipRef.current.hidden = true;
                      }
                    },
                  }}
                  dataKey={hospital.hospital__name}
                  stroke={`${colorsForHospital[idx]}`}
                />
              ))}
            </LineChart>
          ) : (
            <div className="flex justify-center items-center h-full">
              <LoaderCircle size={50} className="animate-spin text-[#1EA66D]" />
            </div>
          )}
        </>
      ) : (
        <p className="flex justify-center items-center h-full">No data available</p>
      )}
    </div>
  );
}
