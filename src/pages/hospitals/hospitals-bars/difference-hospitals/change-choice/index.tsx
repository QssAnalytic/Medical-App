import { Button } from "@/common/components/ui/button"
import Arrows from '/icons/arrows.svg'
import Choices from "../choices"
import { hospitals } from "@/common/static"


const CompareHospitals = () => {
    return (
        <div className="flex h-full w-full items-center justify-between ">

            <div className=""><Choices data={hospitals} /></div>
            <div>
                <Button variant={"ghost"} className="px-1">
                    <img src={Arrows} alt="" className="w-6" />
                </Button>
            </div>
            <div className=""><Choices data={hospitals} /></div>

        </div>
    )
}

export default CompareHospitals