import Chart from "@/common/components/charts";
import { clearUndefinedValues, mergeObjects } from "@/common/lib/utils";
import { TFormValues } from "@/common/types";
import { servicesEndpoints } from "@/services/api/endpoints";
import { getDataViaPost } from "@/services/api/requests";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useSWRMutation from "swr/mutation";

export default function DifferenceServicesCharts() {
  const form = useFormContext();

  const {
    data: charts_st,
    isMutating: chartsLoading_st,
    trigger: postParams_st,
  } = useSWRMutation(servicesEndpoints.charts, getDataViaPost);
  const {
    data: charts_nd,
    isMutating: chartsLoading_nd,
    trigger: postParams_nd,
  } = useSWRMutation(servicesEndpoints.charts, getDataViaPost);

  const postServicesParams_st = async () => {
    try {
      if (form.watch(`hospital_id_st`)) {
        const filteredKeys = Object.fromEntries(
          Object.entries(form.getValues()).filter(
            ([_, value]: any) => (value !== undefined && typeof value !== "object") || value?.length > 0,
          ),
        );

        const postedData: TFormValues | undefined = clearUndefinedValues({
          ...filteredKeys,
          hospital_id: form.watch(`hospital_id_st`),
          dates: form.watch("chart_date"),
        }).reduce((acc, obj) => mergeObjects(acc, obj), {});
        delete postedData?.[`hospital_id_st`];
        await postParams_st(postedData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const postServicesParams_nd = async () => {
    try {
      if (form.watch(`hospital_id_nd`)) {
        const filteredKeys = Object.fromEntries(
          Object.entries(form.getValues()).filter(
            ([_, value]: any) => (value !== undefined && typeof value !== "object") || value?.length > 0,
          ),
        );

        const postedData :  TFormValues | undefined = clearUndefinedValues({
          ...filteredKeys,
          hospital_id: form.watch(`hospital_id_nd`),
          dates: form.watch("chart_date"),
        }).reduce((acc, obj) => mergeObjects(acc, obj), {});
        delete postedData?.[`hospital_id_nd`];
        await postParams_nd(postedData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // For triggering first service (choice)
  useEffect(() => {
    postServicesParams_st();
  }, [form.watch(`hospital_id_st`), form.watch("chart_date"), form.watch("annotate_type"), form.watch("services_ids")]);

  // For triggering second service (choice)
  useEffect(() => {
    postServicesParams_nd();
  }, [form.watch(`hospital_id_nd`), form.watch("chart_date"), form.watch("annotate_type"), form.watch("services_ids")]);

  return (
    <>
      <div className="basis-[33%] flex justify-center items-center bg-white  border border-[#E8E8E8] rounded py-6 h-96">
        <Chart chartsInfo={charts_st} loading={chartsLoading_st} />
      </div>
      <div className="basis-[33%] flex justify-center items-center bg-white border border-[#E8E8E8] rounded py-6 h-96">
        <Chart chartsInfo={charts_nd} loading={chartsLoading_nd} />
      </div>
    </>
  );
}
