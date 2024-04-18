


import Chart from "@/common/components/charts";
import { TFormValues } from "@/common/types";
import { hospitalEndpoints } from "@/services/api/endpoints";
import { getDataViaPost } from "@/services/api/requests";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useSWRMutation from "swr/mutation";

export default function DifferenceServicesCharts() {

  const form = useFormContext()

  const { data: charts_st, isMutating: chartsLoading_st, trigger: postParams_st } = useSWRMutation(hospitalEndpoints.charts, getDataViaPost)
  const { data: charts_nd, isMutating: chartsLoading_nd, trigger: postParams_nd } = useSWRMutation(hospitalEndpoints.charts, getDataViaPost)

  const postServicesParams_st = async () => {
    try {
      if (form.watch(`service_id_st`)) {
        const filteredKeys = Object.fromEntries(
          Object.entries(form.getValues()).filter(
            ([_, value]: any) => (value !== undefined && typeof value !== "object") || value?.length > 0,),);

        const postedData: TFormValues = {
          ...filteredKeys,
          service_id: form.watch(`service_id_st`),
          dates: form.watch("chart_date"),
        };
        delete postedData?.[`service_id_st`];
        await postParams_st(postedData);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const postServicesParams_nd = async () => {
    try {
      if (form.watch(`service_id_nd`)) {
        const filteredKeys = Object.fromEntries(
          Object.entries(form.getValues()).filter(
            ([_, value]: any) => (value !== undefined && typeof value !== "object") || value?.length > 0,),);

        const postedData: TFormValues = {
          ...filteredKeys,
          service_id: form.watch(`service_id_nd`),
          dates: form.watch("chart_date"),
        };
        delete postedData?.[`service_id_nd`]; 
        await postParams_nd(postedData);
      }
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    postServicesParams_st();
    postServicesParams_nd();
  }, [
    form.watch(`service_id_st`),
    form.watch(`service_id_nd`),
    form.watch("chart_date")
  ]);


  return (
    <>
      <div className="basis-[33%] flex justify-center items-center  border border-[#E8E8E8] rounded py-6">
        <Chart loading={chartsLoading_st} chartsInfo={charts_st} />
      </div>
      <div className="basis-[33%] flex justify-center items-center border border-[#E8E8E8] rounded py-6">
        <Chart loading={chartsLoading_nd} chartsInfo={charts_nd} />
      </div>

    </>
  );
}
