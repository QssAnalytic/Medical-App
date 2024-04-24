import Chart from "@/common/components/charts";
import { clearUndefinedValues, mergeObjects } from "@/common/lib/utils";
import { servicesEndpoints } from "@/services/api/endpoints";
import { getDataViaPost } from "@/services/api/requests";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useSWRMutation from "swr/mutation";

export default function CompareAllServicesCharts() {
  const form = useFormContext();
  const {
    data: chart,
    trigger: postParams,
    isMutating: chartsLoading,
  } = useSWRMutation(servicesEndpoints.charts, getDataViaPost);

  const postedParams = clearUndefinedValues({
    dates: form.watch("chart_date"),
    services_ids: form.watch("services_ids"),
    annotate_type: form.watch("annotate_type"),
  }).reduce((acc, obj) => mergeObjects(acc, obj), {});

  const getCompareInfos = async () => {
    try {
      await postParams(postedParams);
      console.log("charts info", chart);
    } catch (err) {
      console.log("compare all by charts err", err);
    }
  };

  useEffect(() => {
    getCompareInfos();
  }, [form.watch("services_ids"), form.watch("chart_date"), form.watch("annotate_type")]);

  return (
    <div className=" flex justify-center items-center border border-[#E8E8E8] rounded py-6 grow h-96">
      <Chart chartsInfo={chart} loading={chartsLoading} />
    </div>
  );
}
