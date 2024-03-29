import { useState } from "react";
import { SelectBox } from "@/common/components/filter/components/select-box";
import { hospitals } from "@/common/static";

const CompareAllHospitals = () => {
    const [selectedHospitals] = useState<string[]>([]);

    // const handleHospitalSelect = (selectedHospital: any) => {
    //     setSelectedHospitals(prevSelected => {
    //         if (prevSelected.includes(selectedHospital)) {
    //             return prevSelected.filter(hospital => hospital !== selectedHospital);
    //         } else {
    //             return [...prevSelected, selectedHospital];
    //         }
    //     });
    // };
    console.log(selectedHospitals)
    return (
        <div>
            <h3 className="text-center text-sm mb-2 text-[#068F84]">Compare hospitals by all services based on price</h3>
            <div className="border rounded-lg p-3 h-96 ">
                <div className="w-full">
                    {/* <SelectBox name={'Hospitals'} data={hospitals} className="w-full py-0 text-lg" multiple={true} onSelect={handleHospitalSelect} /> */}
                    <SelectBox
                        name={'Hospitals'}
                        data={hospitals}
                        className="w-full py-0 text-base"
                        multiple={true}
                        // onSelect={handleHospitalSelect}
                        onSelect={() => { }}
                    />
                </div>
                <div className="scroll overflow-y-auto h-80">
                    {/* <ul>
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
                    </ul> */}
                    <ul>
                        {
                            hospitals.map((hospital, index) => (
                                <div key={index} className="flex justify-between items-center mt-3 px-5 text-sm ">
                                    <li className="">{index + 1}</li>
                                    <li className="  w-full text-end mr-8 ">{hospital.data}</li>
                                    <div className="w-80">
                                        <div className="w-full bg-gray-200 rounded-sm h-3">
                                            <div className="h-3 rounded-sm" style={{ width: `${(-index*3)+97}%`, backgroundColor: hospital.color }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default CompareAllHospitals;
