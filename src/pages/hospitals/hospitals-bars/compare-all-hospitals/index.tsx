import { useState } from "react";
import { SelectBox } from "@/common/components/filter/components/select-box";
import { useFilterStore } from "@/store";
import useSWR from "swr";
import { Fetcher } from '@/services/api/requests.ts'
import { filterEndpoints } from "@/services/api/endpoints.ts";

const CompareAllHospitals = () => {

    const { filter } = useFilterStore();


    const { data: hospitalsData } = useSWR(filter?.hospitals ? filterEndpoints.hospitals(filter?.hospitals) : null, Fetcher);
    console.log(hospitalsData)




    const [selectedHospitals, setSelectedHospitals] = useState<string[]>([]);

    const handleHospitalSelect = (selectedHospital:any) => {

        setSelectedHospitals(prevSelected => {
            if (prevSelected.includes(selectedHospital)) {
                return prevSelected.filter(hospital => hospital !== selectedHospital);
            } else {
                return [...prevSelected, selectedHospital];
            }
        });
    };
    // console.log(selectedHospitals)


    return (
        <div>
            <h3 className="text-center text-sm mb-2 text-[#068F84]">Compare hospitals by all services based on price</h3>
            <div className="border rounded-lg p-3 h-96 ">
                <div className="w-full">
                    <SelectBox
                        name={'Hospitals'}
                        data={hospitalsData}
                        className="w-full py-0 text-base"
                        multiple={true}
                        onSelect={handleHospitalSelect}
                    />
                </div>
                {/* <button onClick={() => { setFilter({ hospitals: 'hospitals' })}}>saldnsjfsd;j</button> */}




                <div className="scroll overflow-y-auto h-80">
                    <ul>
                        {selectedHospitals.map((hospital, index) => (
                            <div key={index} className="flex justify-between items-center mt-3 px-5 text-sm ">
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
                    {/* <ul>
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
                    </ul> */}

                </div>
            </div>
        </div>
    );
};

export default CompareAllHospitals;
