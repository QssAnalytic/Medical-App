import HospitalsCharts from "./hospital-charts"
import HospitalsBars from "./hospitals-bars"

const Hospitals = () => {
  return (
    <div className="border rounded px-2 py-3">
      <div> <HospitalsBars /> </div>
      <div> <HospitalsCharts /> </div>
    </div>
  )
}

export default Hospitals