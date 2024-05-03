import ServicesBars from "./service-bars";
import ServicesCharts from "./service-charts";

const Services = () => {
  return (
    <div className="border border-mainBorder bg-chartBg rounded-lg px-4 py-3 relative ml-3 mb-10 h-full">
      <div className="relative">
        <p className="absolute transform -rotate-90  w-72  text-center text-base text-mainText font-medium left-[-180px] top-[47%]">
          Hospitals Comparsion
        </p>
        <ServicesBars />
      </div>
      <div className="relative">
        <p className="absolute transform -rotate-90  w-72  text-center text-base text-mainText font-medium left-[-180px] top-[47%]">
          Time Series Analysis
        </p>
        <ServicesCharts />
      </div>
    </div>
  );
};

export default Services;
