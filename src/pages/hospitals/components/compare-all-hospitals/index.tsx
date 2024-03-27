import { SelectBox } from "@/common/components/filter/components/select-box";
import { hospitals } from "@/common/static";

const CompareAllHospitals = () => {
    return (
        <div>
            <h3 className="text-center text-sm mb-2">Compare hospitals by all services based on price</h3>
            <div className="border rounded-lg p-3 h-96 w-[94%]">
                <div className="w-full">
                    <SelectBox name={'Hospitals'} data={hospitals} selectedItems={[]} setSelectedItems={()=>{}} className="w-full py-0 text-lg" />
                </div>
                <div>
                    {hospitals.map((hospital, index) => (
                        <div key={index} className="flex justify-between items-center px-5 mt-2">
                            <span>{index + 1}</span>
                            <p className="text-end w-full">{hospital.data}</p>
                            <div className="w-2/4 bg-gray-200 rounded h-3 ml-10">
                                <div className="bg-gray-400 h-3 rounded" style={{ width: '78%' }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CompareAllHospitals;
