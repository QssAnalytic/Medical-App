import ChangeChoice from "./change-choice"
import FirstChoice from "./first-choice"
import SecondChoice from "./second-choice"

const DifferenceHospitals = () => {
  return (
    <div>
      <h3 className="text-center text-sm mb-2 text-[#068F84]">Compare hospitals by selected services based on price</h3>

      <div className="flex justify-center items-center border rounded-lg p-2 h-96 bg-[#c8e7e5] ">
        <FirstChoice />
        <ChangeChoice />
        <SecondChoice />
      </div>
    </div>
  )
}

export default DifferenceHospitals