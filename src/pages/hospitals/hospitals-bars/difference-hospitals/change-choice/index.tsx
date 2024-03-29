import { Button } from "@/common/components/ui/button"
import Arrows from '../../../../../../public/icons/arrows.svg'

const ChangeChoice = () => {
    return (
        <Button variant={"ghost"} className="px-1" >
            <img  src={Arrows} alt=""  className="w-12 "/>

        </Button>
    )
}

export default ChangeChoice