import { SelectBox } from "@/common/components/filter/components/select-box"
import { TSelectItem } from "@/common/types"

interface ChoicesProps {
    data: TSelectItem[];
}


const Choices: React.FC<ChoicesProps> = ({ data }) => {
    return (
        <div className="h-full bg-white rounded p-2">
            <div className="flex items-center  mb-1 justify-end ">
                <h2 className="mx-5  font-semibold text-[#104C48]">Hospitals</h2>
                <div className="w-[45%]">
                    <SelectBox
                        className="w-full py-0 text-base"
                        data={data}
                        onSelect={() => { }}
                        multiple={true}
                        name={'Services'}
                    />
                </div>
            </div>
            <div className="scroll overflow-y-auto h-[19rem]">
                <ul>
                    {
                        data.map((item: TSelectItem, index: number) => (
                            <div key={index} className="flex justify-between items-center mt-3 gap-3 pl-3  text-sm">
                                <li className="">{index + 1}</li>
                                <li className=" w-40 text-end">{item.name}</li>
                                <div className="w-[9rem] pl-2">
                                    <div className=" rounded h-3 bg-[#d8d8d8]">
                                        <div className="h-3 rounded-sm" style={{ width: `${(-index * 3) + 97}%`, backgroundColor: item.color }}></div>
                                    </div>
                                </div>
                                <span className="">{-index + 150}</span>
                            </div>
                        ))
                    }
                </ul>
            </div>

        </div>
    )
}

export default Choices