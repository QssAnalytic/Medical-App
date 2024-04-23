import { Button } from "@/common/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/common/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/common/components/ui/form";
import { PopoverContent } from "@/common/components/ui/popover";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/common/lib/utils";
import Vector from "/icons/vector.svg";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { hospitalEndpoints, servicesEndpoints } from "@/services/api/endpoints";
import { getData, getDataViaPost } from "@/services/api/requests";
import { Check, LoaderCircle } from "lucide-react";
import useSWRMutation from "swr/mutation";
import { TFormValues } from "@/common/types";
import { colorsForHospital } from "@/common/static";

type TChoiceProps = {
  mainKey: string;
};

const Choices = ({ mainKey }: TChoiceProps) => {
  const form = useFormContext();
  const [open, setOpen] = useState<boolean>(false);

  const { data: hospitals } = useSWR(hospitalEndpoints.base, getData);

  const {
    data: lineBars,
    trigger: postParams,
    isMutating: loadingLineBars,
  } = useSWRMutation(servicesEndpoints?.lineBar, getDataViaPost);

  const postServicesParams = async () => {
    try {
      if (form.watch(`hospital_id_${mainKey}`)) {
        const filteredKeys = Object.fromEntries(
          Object.entries(form.getValues()).filter(
            ([_, value]: any) =>
              (value !== undefined && typeof value !== "object") ||
              value?.length > 0 ||
              (typeof value === "object" && Object.values(value).length > 0),
          ),
        );

        const postedData: TFormValues = {
          ...filteredKeys,
          hospital_id: form.watch(`hospital_id_${mainKey}`),
        };
        delete postedData?.[`hospital_id_st`];
        delete postedData?.[`hospital_id_nd`];
        await postParams(postedData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    postServicesParams();
  }, [
    form.watch(`hospital_id_${mainKey}`),
    form.watch("services_ids"),
    form.watch("dates"),
    form.watch("annotate_type"),
  ]);

  return (
    <div className="border rounded-lg  bg-white">
      <div className="w-full p-3">
        <Form {...form}>
          <form className="flex justify-between">
            <div className="w-full">
              <FormField
                control={form.control}
                name={`hospital_id_${mainKey}`}
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <Popover open={open} onOpenChange={setOpen}>
                      <div className="flex justify-end items-center gap-5">
                        <p>Services</p>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-1/2 h flex justify-center bg-[#E3F2F1] gap-3")}>
                              {hospitals?.find((item: { id: number }) => item.id === field.value)?.name || "Hospital"}
                              <img src={Vector} alt="" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                      </div>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search services" />
                          <CommandList>
                            <CommandEmpty>No services found.</CommandEmpty>
                            <CommandGroup>
                              {hospitals?.map((item: { name: string; id: number }) => (
                                <CommandItem
                                  value={item.id.toString()}
                                  key={item.name}
                                  onSelect={() => {
                                    form.setValue(`hospital_id_${mainKey}`, item.id);
                                    setOpen(false);
                                  }}>
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === item.id ? "opacity-100" : "opacity-0",
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

      <div className="scroll overflow-y-auto h-72">
        {!loadingLineBars ? (
          <ul>
            {lineBars?.statistics?.length > 0 ? (
              lineBars?.statistics?.map((item: any, index: number) => {
                return (
                  <div key={index} className="flex justify-between items-center mt-3 px- text-sm gap-3  px-3">
                    <div className=" w-6 ">{index + 1}</div>
                    <div className="w-36 truncate text-wrap  text-end">{item?.name}</div>
                    <div className="flex justify-center items-center  gap-4 pl-1">
                      <div className="w-36">
                        <div className="bg-[#d8d8d8] rounded h-3">
                          <div
                            className="bg-gray-600 h-3 rounded"
                            style={{
                              width: `${(item?.data / lineBars?.max_count) * 100}%`,
                              background: `${colorsForHospital[index]}`,
                            }}></div>
                        </div>
                      </div>
                      <div className=" w-5">{item?.data}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="flex justify-center items-center h-72">No data found</p>
            )}
          </ul>
        ) : (
          <div className="flex justify-center items-center h-full">
            <LoaderCircle size={50} className="animate-spin text-[#1EA66D]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Choices;
