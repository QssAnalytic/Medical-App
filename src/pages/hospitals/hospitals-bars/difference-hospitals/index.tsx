import { Button } from "@/common/components/ui/button";
import Choices from "./choices";
import { ArrowRightLeft } from "lucide-react";

const DifferenceHospitals = () => {
  return (
    <div>
      <h3 className="text-center text-sm mb-2 text-[#068F84]">Compare hospitals by selected services based on price</h3>

      <div className="flex justify-center items-center border rounded-lg py-2 px-2 h-96 bg-[#c8e7e5] ">
        <div className="flex h-full w-full items-center justify-between px-1">
          <div className="basis-[49%]">
            <Choices mainKey="st" />
          </div>
          <Button variant={"ghost"} className="px-0 cursor-pointer hover:none">
            <ArrowRightLeft size={20} className="text-[#184E4E] cursor-pointer"/>
          </Button>
          <div className="basis-[49%]">
            <Choices mainKey="nd" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifferenceHospitals;
