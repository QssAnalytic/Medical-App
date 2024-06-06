// import { colorsForHospital } from "@/common/static";
import { colorsForHospital } from "@/common/static";
import { ANNOTATES } from "@/pages/hospitals/types";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { LineChart, CartesianGrid, XAxis, YAxis, Line, DotProps } from "recharts";

interface HospitalStatistics {
  date: string;
  data: number;
}

interface HospitalInfo {
  name: string;
  statistics: HospitalStatistics[];
}

interface ChartProps {
  chartsInfo?: HospitalInfo[];
  loading?: boolean;
}

export default function Chart({ chartsInfo, loading }: ChartProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const form = useFormContext();

  // function generateRandomColor() {
  //   // Generate random values for red, green, and blue components
  //   var r = Math.floor(Math.random() * 256);
  //   var g = Math.floor(Math.random() * 256);
  //   var b = Math.floor(Math.random() * 256);

  //   // Construct the RGB color string
  //   var color = "rgb(" + r + ", " + g + ", " + b + ")";

  //   return color;
  // }

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
        monthData[hospital.name] = hospital?.statistics?.find((stat) => stat.date === monthData.name)?.data || 0;
      });

      chartData.push(monthData);
    });

  const randomIndex = () => {
    return Math.floor(Math.random() * colorsForHospital?.length);
  };

  return (
    <div className="relative h-full">
      {chartsInfo?.length ? (
        <>
          <div
            className="absolute border shadow rounded-md bg-gray-50 w-64 h-16 p-2 z-50 text-sm text-prettier break-all"
            ref={tooltipRef}
            hidden></div>
          {!loading ? (
            <LineChart
              className="relative"
              width={500}
              height={320}
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid horizontal={true} vertical={false} verticalFill={["#D9D9D9"]} />
              <XAxis dataKey="name" interval="preserveStartEnd" />
              <YAxis width={30} tickSize={1} />

              {chartsInfo?.map((hospital: HospitalInfo) => (
                <Line
                  key={hospital.name}
                  strokeWidth={1.7}
                  type="monotone"
                  dot={{
                    onMouseMove: (e: DotProps & { dataKey: string; value: number }) => {
                      if (tooltipRef.current) {
                        tooltipRef.current.hidden = false;
                        const value = e.value;
                        const x = e.cx;
                        const y = e.cy;

                        tooltipRef.current.innerHTML = `<p>Xəstəxana : ${e.dataKey}</p> <p>${
                          form.watch("annotate_type") === ANNOTATES.Price
                            ? "Gəlir"
                            : form.watch("annotate_type") === ANNOTATES.Count
                            ? "Satılmış xidmət sayı"
                            : "Xəstələrin sayı "
                        } : ${value}</p>`;
                        if (tooltipRef.current.style) {
                          tooltipRef.current.style.top = `${(y || 0) - 72}px`;
                          tooltipRef.current.style.left = `${(x || 0) - 180}px`;
                        }
                      }
                    },
                    onMouseLeave: () => {
                      if (tooltipRef.current) {
                        chartsInfo;
                        tooltipRef.current.hidden = true;
                      }
                    },
                  }}
                  dataKey={hospital.name}
                  stroke={`${colorsForHospital[`${randomIndex()}`]}`}
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
        <p className="flex justify-center items-center h-full">Məlumat yoxdur</p>
      )}
    </div>
  );
}
