import CompareAllServicesBars from "./compare-all-services"
import DifferenceServicesBars from "./difference-services"

const ServicesBars = () => {
  return (
    <section className="w-full flex gap-8">
    <div className="w-1/3 ">
      <CompareAllServicesBars /> 
    </div>
    <div className="w-2/3 ">
      <DifferenceServicesBars />
    </div>

  </section>
  )
}

export default ServicesBars