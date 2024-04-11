import CompareAllHospitals from "./compare-all-hospitals";
import DifferenceHospitals from "./difference-hospitals";


export default function HospitalsBars( ) {
  return (
    <section className="w-full flex gap-8">
      <div className="w-1/3 ">
        <CompareAllHospitals />
      </div>
      <div className="w-2/3 ">
        <DifferenceHospitals />
      </div>

    </section>
  )
}
