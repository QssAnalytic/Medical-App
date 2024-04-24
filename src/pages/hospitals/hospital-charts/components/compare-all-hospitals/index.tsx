import Chart from "@/common/components/charts";
import useSWRMutation from "swr/mutation";
import { hospitalEndpoints } from "@/services/api/endpoints"; 
import { getDataViaPost } from "@/services/api/requests";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { clearUndefinedValues, mergeObjects } from "@/common/lib/utils";

export default function CompareByCharts() {
  const form = useFormContext();

  const { data: chart, trigger: postParams, isMutating: chartsLoading } = useSWRMutation(hospitalEndpoints.charts, getDataViaPost);

  const postedParams = clearUndefinedValues({
    dates: form.watch("chart_date"),
    hospital_ids: form.watch("hospital_ids"),
    annotate_type: form.watch("annotate_type"), 
  }).reduce((acc, obj) => mergeObjects(acc, obj), {});

  const getCompareInfos = async () => {
    try {
      await postParams(postedParams);
      console.log('charts info', chart)
    } catch (err) {
      console.log("compare all by charts err", err);
    }
  };

  useEffect(() => {
    getCompareInfos();
  }, [form.watch("hospital_ids"), form.watch("chart_date"), form.watch('annotate_type')]);


  return (
    <div className=" flex justify-center items-center border border-[#E8E8E8] rounded py-6 grow">
      <Chart chartsInfo={chart} loading={chartsLoading} />
    </div>
  );
}
