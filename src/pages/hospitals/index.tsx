import HospitalsCharts from "./hospital-charts"
import HospitalsBars from "./hospitals-bars"

const Hospitals = () => {
  return (
    <div className="border rounded-lg px-4 py-3 relative ml-3 mb-10 h-full">
      <div>
        <p className="absolute transform -rotate-90  w-72  text-center text-base text-[#068F84] font-medium right-[91%] top-[24%]">Services  Comparsion</p>
        <HospitalsBars />
      </div>
      <div>
        <p className="absolute transform -rotate-90  w-72  text-center text-base text-[#068F84] font-medium right-[91%] top-[78%]" >Time Series Analysis</p>
        <HospitalsCharts />
      </div>
    </div>
  )
}

export default Hospitals