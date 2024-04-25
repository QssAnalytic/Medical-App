import HospitalsCharts from "./hospital-charts"
import HospitalsBars from "./hospitals-bars"

const Hospitals = () => {
  return (
    <div className="border border-mainBorder bg-chartBg rounded-lg px-4 py-3 relative ml-3 mb-10 h-full">
      <div>
        <p className="absolute transform -rotate-90  w-72  text-center text-base text-mainText font-medium right-[91%] top-[24%]">Hospitals  Comparsion</p>
        <HospitalsBars />
      </div>
      <div>
        <p className="absolute transform -rotate-90  w-72  text-center text-base text-mainText font-medium right-[91%] top-[78%]" >Time Series Analysis</p>
        <HospitalsCharts />
      </div>
    </div>
  )
}

export default Hospitals