import Chart from "@/common/components/charts";
// import { hospitalEndpoints } from "@/services/api/endpoints";
// import { getDataViaPost } from "@/services/api/requests";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
// import useSWRMutation from "swr/mutation";

export default function DifferenceByCharts() {
  const form = useFormContext();

  // const { data: chartSt, trigger: postParamsSt } = useSWRMutation(hospitalEndpoints.charts, getDataViaPost);

  useEffect(()=>{
    console.log('salam qaqaaa', form.watch('service_id_st'))
  },[form.watch('service_id_st')])

  return (
    <>
      <div className="basis-[33%] bg-[#FFFFFF] border border-[#E8E8E8] rounded p-3">
        <Chart />
      </div>
      <div className="basis-[33%] bg-[#FFFFFF] border border-[#E8E8E8] rounded p-3">
        <Chart />
      </div>
    </>
  );
}
