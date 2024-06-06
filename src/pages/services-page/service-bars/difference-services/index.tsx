import { Button } from "@/common/components/ui/button";
import Choices from "./choices";
import { ArrowRightLeft } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ANNOTATES } from "@/pages/hospitals/types";

const DifferenceServicesBars = () => {
  const form = useFormContext();

  return (
    <div>
      <h3 className="text-center text-sm mb-2 text-mainText">
        Xidmətlərin{" "}
        {form.watch("annotate_type") === ANNOTATES.Price
          ? "seçilmiş xəstəxanalara verdiyi ümumi gəlir"
          : form.watch("annotate_type") === ANNOTATES.Count
          ? "seçilmiş müvafiq xəstəxanalarda olan mövcud say"
          : "seçilmiş xəstəxanalarda bu xidmətdən istifadə edən xəstə sayı"}{" "}
        əsasında müqaisəsi
      </h3>

      <div className="flex justify-center items-center border border-filterBorder rounded-lg py-2 px-2 h-96 bg-compareBg ">
        <div className="flex h-full w-full items-center justify-between px-1">
          <div className="basis-[49%]">
            <Choices mainKey={"st"} />
          </div>
          <Button variant={"ghost"} className="px-0 cursor-pointer hover:none">
            <ArrowRightLeft size={20} className="text-[#184E4E] cursor-pointer" />
          </Button>
          <div className="basis-[49%]">
            <Choices mainKey={"nd"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifferenceServicesBars;
