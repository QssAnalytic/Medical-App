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
import { clearUndefinedValues, cn, mergeObjects } from "@/common/lib/utils";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { hospitalEndpoints, servicesEndpoints } from "@/services/api/endpoints";
import { getData, getDataViaPost } from "@/services/api/requests";
import { ANNOTATES, THospital, THospitalSecondary } from "@/pages/hospitals/types";
import useSWRMutation from "swr/mutation";
import { colorsForHospital } from "@/common/static";
import { BiSolidDownArrow } from "react-icons/bi";

const CompareAllServicesbars = () => {
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  useFieldArray({ name: "services_ids", control: form.control });

  const { data: services } = useSWR(hospitalEndpoints.services, getData);
  const {
    data: lineBars,
    trigger: postParams,
    isMutating: loading,
  } = useSWRMutation(servicesEndpoints.lineBar, getDataViaPost);

  const postedParams = clearUndefinedValues({
    dates: form.watch("dates"),
    services_ids: form.watch("services_ids"),
    annotate_type: form.watch("annotate_type"),
  }).reduce((acc, obj) => mergeObjects(acc, obj), {});

  const getLineBars = async () => {
    try {
      console.log("posted params services", postedParams);
      await postParams(postedParams);
    } catch (err) {
      console.log("err");
    }
  };

  useEffect(() => {
    getLineBars();
  }, [form.watch("services_ids"), form.watch("annotate_type"), form.watch("dates")]);

  return (
    <div>
      <h3 className="text-center text-sm mb-2 text-mainText">
        Xidmətlərin{" "}
        {form.watch("annotate_type") === ANNOTATES.Price
          ? "xəstəxanaya verdiyi ümumi gəlir"
          : form.watch("annotate_type") === ANNOTATES.Count
          ? "müvafiq xəstəxanalardakı mövcud sayları"
          : "müvafiq xəstəxanalardakı həmin xidmətdən istifadə edən xəstələrin sayı"} əsasında müqaisəsi
      </h3>
      <div className="border border-transparent rounded-lg p-3 h-96 bg-white">
        <div className="w-full">
          <Form {...form}>
            <form className="flex justify-between">
              <div className="w-full h-auto">
                <FormField
                  control={form.control}
                  name="services_ids"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full h-10 flex justify-center gap-3 text-activeNavText bg-filter border-none",
                              )}>
                              Xidmətlər
                              <BiSolidDownArrow className="text-icon" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search service" />
                            <CommandList>
                              <CommandEmpty>Məlumat tapılmadı.</CommandEmpty>
                              <CommandGroup>
                                {services?.map((item: THospital) => (
                                  <CommandItem
                                    value={item.name}
                                    key={item.name}
                                    onSelect={() => {
                                      const currValues = form.watch("services_ids");
                                      if (!currValues.includes(item.id)) {
                                        form.setValue("services_ids", [...currValues, item.id]);
                                        setOpen(false);
                                      } else {
                                        form.setValue(
                                          "services_ids",
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
                lineBars?.statistics?.map((item: THospitalSecondary, idx: number) => {
                  let index = Math.floor(Math.random() * colorsForHospital.length);
                  return (
                    <div key={idx} className="flex justify-between items-center mt-3 px-5 text-sm">
                      <li className="">{idx + 1}</li>
                      <li className="w-40 text-end">{item?.name}</li>
                      <div>
                        <div>
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
                                    {item?.data} /{" "}
                                    <span className="text-green-500 font-bold">{lineBars?.max_count}</span>
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="flex justify-center items-center h-72">Məlumat tapılmadı</p>
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

export default CompareAllServicesbars;
