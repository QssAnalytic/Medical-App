import { LoaderCircle } from "lucide-react";

export default function Spinner() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoaderCircle className="animate-spin text-[#068F84]" size={60} />
    </div>
  );
}
