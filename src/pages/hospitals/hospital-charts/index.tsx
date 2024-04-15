import { FormField, Form, FormItem, FormControl } from "@/common/components/ui/form";
import { PopoverContent } from "@/common/components/ui/popover";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/common/components/ui/command";
import { CommandList } from "cmdk";
import { TMonth, TYear } from "../types";
import { Check } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { cn } from "@/common/lib/utils";
import { months, years } from "@/common/static";
import { useFormContext } from "react-hook-form";
import Vector from "/icons/vector.svg";
import { useEffect } from "react";
import CompareByCharts from "./components/compare-all-hospitals";
import DifferenceByCharts from "./components/difference-hospitals";

const HospitalsCharts = () => {
  const form = useFormContext();

  useEffect(() => {
    console.log("chart date", form.watch("chart_date"));
  }, [form.watch("chart_date")]);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-4">
        <div className="date-filters text-base">
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="chart_date"
                render={({ field }) => (
                  <div className="flex gap-4">
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-52 h-12 flex justify-center bg-[#E3F2F1] gap-3",
                                !field.value && "text-muted-foreground",
                              )}>
                              {field.value?.year
                                ? years.find((years) => years.data === field.value?.year)?.data
                                : "Year"}
                              <img src={Vector} alt="" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Command>
                            <CommandInput placeholder="Search..." />
                            <CommandList>
                              <CommandEmpty>No year found.</CommandEmpty>
                              <CommandGroup className="h-20 overflow-y-auto">
                                {years.map((item: TYear) => (
                                  <CommandItem
                                    value={item.data.toString()}
                                    key={item.data}
                                    onSelect={() => {
                                      form.setValue("chart_date", { ...form.watch("chart_date"), year: item.data });
                                    }}>
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        item.data === field.value?.year ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                    {item.data}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-52 h-12 flex justify-center bg-[#E3F2F1] gap-3",
                                !field.value && "text-muted-foreground",
                              )}>
                              {field.value?.month
                                ? months.find((month) => month.id === field.value?.month)?.data
                                : "Month"}
                              <img src={Vector} alt="" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Command>
                            <CommandInput placeholder="Search..." />
                            <CommandList>
                              <CommandEmpty>No year found.</CommandEmpty>
                              <CommandGroup className="h-20 overflow-y-auto">
                                {months.map((item: TMonth) => (
                                  <CommandItem
                                    value={item.data.toString()}
                                    key={item.data}
                                    onSelect={() => {
                                      form.setValue("chart_date", { ...form.watch("chart_date"), month: item.id });
                                    }}>
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        item.data === field.value?.month ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                    {item.data}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  </div>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-6 grow">
        <CompareByCharts />
        <DifferenceByCharts />
      </div>
    </div>
  );
};

export default HospitalsCharts;
