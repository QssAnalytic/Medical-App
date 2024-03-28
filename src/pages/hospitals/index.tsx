import CompareAllHospitals from "./components/compare-all-hospitals";
import DifferenceHospitals from "./components/difference-hospitals";


export default function Hospitals() {
  return (
    <section className="w-full flex gap-3">
      <div className="w-1/3 ">
        <CompareAllHospitals />
      </div>
      <div className="w-2/3 ">
        <DifferenceHospitals />
      </div>

    </section>
  )
}
