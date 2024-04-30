import { Button } from "@/common/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/common/components/ui/command";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/common/components/ui/form";
import { PopoverContent } from "@/common/components/ui/popover";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { clearUndefinedValues, cn, mergeObjects } from "@/common/lib/utils";
import { useFieldArray, useFormContext } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { hospitalEndpoints } from "@/services/api/endpoints";
import { getData, getDataViaPost } from "@/services/api/requests";
import useSWR from "swr";
import { THospital, THospitalSecondary } from "../../types";
import { colorsForHospital } from "@/common/static";
import { BiSolidDownArrow } from "react-icons/bi";

const CompareAllHospitals = () => {
  const form = useFormContext();
  const [open, setOpen] = useState<boolean>(false);
  useFieldArray({ name: "hospital_ids", control: form.control });

  const { data: hospitals } = useSWR<THospital[]>(hospitalEndpoints.base, getData);
  const {
    data: lineBars,
    trigger: postParams,
    isMutating: loading,
  } = useSWRMutation(hospitalEndpoints.lineBar, getDataViaPost);

  // Important key-values for comparing all hospitals
  const postedParams = clearUndefinedValues({
    dates: form.watch("dates"),
    hospital_ids: form.watch("hospital_ids"),
    annotate_type: form.watch("annotate_type"),
  }).reduce((acc, obj) => mergeObjects(acc, obj), {});

  const getLineBars = async () => {
    try {
      console.log("posted params", postedParams);
      await postParams(postedParams);
    } catch (err) {
      console.log("err");
    }
  };

  useEffect(() => {
    console.log("annotate in compare", form.watch("annotate_type"));
    getLineBars();
  }, [form.watch("hospital_ids"), form.watch("annotate_type"), form.watch("dates")]);

  return (
    <div>
      <h3 className="text-center text-sm mb-2 text-mainText">Compare hospitals by all services based on price</h3>
      <div className="border border-transparent rounded-lg p-3 h-96 flex gap-3 flex-col bg-white">
        <div className="w-full">
          <Form {...form}>
            <form className="flex justify-between">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="hospital_ids"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full h-10 flex justify-center bg-filter gap-3 text-activeNavText border-none",
                              )}>
                              {field.value?.length > 0
                                ? hospitals?.find((hospital: THospital) => field.value.includes(hospital.id))?.name
                                : "Hospital"}
                              <BiSolidDownArrow className="text-icon" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search hospital" />
                            <CommandList>
                              <CommandEmpty>No hospital found.</CommandEmpty>
                              <CommandGroup>
                                {hospitals?.map((item: THospital) => (
                                  <CommandItem
                                    value={item.name}
                                    key={item.name}
                                    onSelect={() => {
                                      const currValues = form.watch("hospital_ids");
                                      if (!currValues.includes(item.id)) {
                                        form.setValue("hospital_ids", [...currValues, item.id]);
                                        setOpen(false);
                                      } else {
                                        form.setValue(
                                          "hospital_ids",
                                          currValues.filter((val: any) => val !== item.id),
                                        );
                                        setOpen(false);
                                      }
                                    }}>
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value?.find((id: number) => id === item.id) ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                    {item.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

        <div className="scroll overflow-y-auto h-80 bg-white">
          {!loading ? (
            <ul>
              {lineBars?.statistics?.length > 0 ? (
                lineBars?.statistics?.map((item: THospitalSecondary, index: number) => {
                  // let index = Math.floor(Math.random() * colorsForHospital.length);
                  return (
                    <li key={index} className="flex justify-between items-center mt-3 px-5 text-sm">
                      <span className="">{index + 1}</span>
                      <span className="w-40 text-end">{item?.name}</span>
                      <div className="w-[11rem] pl-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="bg-[#d8d8d8] rounded h-3 hover:cursor-pointer">
                                <div
                                  className="h-3 rounded pl-1"
                                  style={{
                                    width: `${(item?.data / lineBars?.max_count) * 100}%`,
                                    background: `${colorsForHospital[index]}`,
                                    borderRadius: "4px",
                                  }}></div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-orange-700">
                                {item?.data} / <span className="text-green-500 font-bold">{lineBars?.max_count}</span>
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </li>
                  );
                })
              ) : (
                <p className="flex justify-center items-center h-72">No data found</p>
              )}
            </ul>
          ) : (
            <div className="flex h-80 justify-center items-center">
              <LoaderCircle size={50} className="animate-spin text-[#1EA66D]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareAllHospitals;
