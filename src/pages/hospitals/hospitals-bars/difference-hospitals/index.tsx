import ChangeChoice from "./change-choice"

const DifferenceHospitals = () => {
  return (
    <div>
      <h3 className="text-center text-sm mb-2 text-[#068F84]">Compare hospitals by selected services based on price</h3>

      <div className="flex justify-center items-center border rounded-lg py-2 px-2 h-96   bg-[#c8e7e5] ">
        <ChangeChoice />
      </div>
    </div>
  )
}

export default DifferenceHospitals