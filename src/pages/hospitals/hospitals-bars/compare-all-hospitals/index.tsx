import { useEffect, useState } from "react";
import { SelectBox } from "@/common/components/filter/components/select-box";
import { useFilterStore } from "@/store";
import useSWR from "swr";
import { Fetcher } from '@/services/api/requests.ts'
import { filterEndpoints } from "@/services/api/endpoints.ts";



const CompareAllHospitals = () => {

    const { filter, setFilter } = useFilterStore();
    const { data: hospitalsData } = useSWR(
        filter?.hospitals
            ? filterEndpoints.hospitals(filter?.hospitals)
            : null,
        Fetcher);

    const [selectedHospitals, setSelectedHospitals] = useState<string[]>([]);

    const handleHospitalSelect = (selectedHospital: any) => {
        setSelectedHospitals(prevSelected => {
            if (prevSelected.includes(selectedHospital)) {
                return prevSelected.filter(hospital => hospital !== selectedHospital);
            } else {
                return [...prevSelected, selectedHospital];
            }
        });
    };

    useEffect(() => { { setFilter({ hospitals: 'hospitals' }) } }, [])

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

                <div className="scroll overflow-y-auto h-80">
                    <ul>
                        {selectedHospitals.map((hospital, index) => (
                            <div key={index} className="flex justify-between items-center mt-3 px-5 text-sm ">
                                <li className="">{index + 1}</li>
                                <li className="  w-40 text-end">{hospital}</li>
                                <div className="w-[11rem] pl-2">
                                    <div className=" bg-[#d8d8d8] rounded h-3">
                                        <div className="bg-gray-600 h-3 rounded" style={{ 'width': '45%' }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CompareAllHospitals;
