import { Fetcher } from "@/services/api/requests.ts";
import { filterEndpoints } from "@/services/api/endpoints.ts";
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
import { useFilterStore } from "@/store";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { useEffect } from "react";
import { cn } from "@/common/lib/utils";
import { useFormContext } from "react-hook-form";
import Vector from "/icons/vector.svg";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import axios from "axios";

const Choices = ({ mainKey }: { mainKey: string }) => {
  const form = useFormContext();

  const { data: servicesData } = useSWR(filter?.services ? filterEndpoints.services : null, Fetcher);

  const postData = async (path: string, { arg }: { arg: unknown }) => (await axios.post(path, arg)).data;

  const url = "https://medicalprojectback-production.up.railway.app/hospitals/services/line-bar/";

  const { data: AllDatas, trigger: posting } = useSWRMutation(form.getValues() ? url : null, postData);

  console.log(`choice ${mainKey}`, AllDatas);

  const testFn = async () => {
    try {
      const postedData = form.getValues();
      await posting({
        ...postedData,
        service_id: postedData?.[`service_id_${mainKey}`],
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    testFn();
  }, [form.watch(`service_id_${mainKey}`)]);

  console.log("hospital compare all", AllDatas);

  const max = AllDatas?.max_count;

  return (
    <div>
      <div className="border rounded-lg  bg-white">
        <div className="w-full p-3  ">
          <Form {...form}>
            <form className="flex justify-between ">
              <div className="w-full mt-">
                <FormField
                  control={form.control}
                  name={`service_id_${mainKey}`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full ">
                      <Popover>
                        <div className="flex justify-end items-center gap-5">
                          <p>Hospitals</p>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-1/2 h flex justify-center bg-[#E3F2F1] gap-3",
                                  !field.value && "text-muted-foreground",
                                )}>
                                {servicesData?.find((item: { id: number }) => item.id === field.value)?.name ||
                                  "Service"}

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
                                {servicesData?.map((item: { name: string; id: number }) => (
                                  <CommandItem
                                    value={item.id}
                                    key={item.name}
                                    onSelect={() => {
                                      form.setValue(`service_id_${mainKey}`, item.id);
                                    }}>
                                    {/* <Check className={cn("mr-2 h-4 w-4", (field.value) && field.value.find && field.value.find((id: number) => id === item.id) ? "opacity-100" : "opacity-0")} /> */}
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

        <div className="scroll overflow-y-auto  h-72  ">
          <ul>
            {AllDatas?.statistics?.map((item: any, index: number) => {
              return (
                <div key={index} className="flex justify-between items-center mt-3 px- text-sm gap-3  px-3">
                  <div className=" w-6 ">{index + 1}</div>
                  <div className="w-36 truncate text-wrap  text-end">{item?.name}</div>
                  <div className="flex justify-center items-center  gap-4 pl-1">
                    <div className="w-36">
                      <div className="bg-[#d8d8d8] rounded h-3">
                        <div
                          className="bg-gray-600 h-3 rounded"
                          style={{ width: `${(item?.data / max) * 100}%` }}></div>
                      </div>
                    </div>
                    <div className=" w-5">{item?.data}</div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Choices;
