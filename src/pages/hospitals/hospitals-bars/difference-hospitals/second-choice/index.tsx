import { SelectBox } from "@/common/components/filter/components/select-box"
import { hospitals, services } from "@/common/static"

const SecondChoice = () => {
  return (
    <div className="h-full w-full bg-white rounded p-3 ">
      <div className="flex items-center justify-end ">
        <h2 className="mr-4">Hospitals</h2>
        <div className="w-1/2">
        <SelectBox
            className="w-full py-0 text-lg"
            data={services}
            onSelect={() => { }}
            multiple={true}
            name={'Services'} />
        </div>

      </div>
      <div className="scroll overflow-y-auto h-[19rem] mt-2">
        {/*
         <ul>
                        {selectedHospitals.map((hospital, index) => (
                            <div key={index} className="flex justify-between items-center mt-3 px-5 text-base ">
                                <li className="">{index + 1}</li>
                                <li className="  w-full text-end mr-8 ">{hospital}</li>
                                <div className="w-44">
                                    <div className="w-full bg-gray-200 rounded h-3">
                                        <div className="bg-blue-600 h-3 rounded" style={{ 'width': '45%' }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
            </ul> 
        */}
        <ul>
          {
            hospitals.map((hospital, index) => (
              <div key={index} className="flex justify-between items-center mt-3 gap-4 px-5 text-sm">
                <li className="">{index + 1}</li>
                <li className=" w-full text-end">{hospital.data}</li>
                <div className="w-full ">
                  <div className="w-full rounded h-3 bg-[#d8d8d8]">
                    <div className="bg-red-400 h-3 rounded" style={{ 'width': '45%' }}></div>
                  </div>
                </div>
                <span className="">{index + 102}</span>
              </div>
            ))
          }
        </ul>
      </div>

    </div>
  )
}

export default SecondChoice