import { Form, FormControl, FormField, FormItem, FormMessage, } from "../ui/form"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "../ui/popover"
import { Check } from "lucide-react";
import { cn } from "@/common/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CommandList } from "cmdk";
import Count from '/icons/count.svg'
import Price from '/icons/price.svg'
import Vector from '/icons/vector.svg'
import Patients from '/icons/patients.svg'
import { days, months, years } from "@/common/static";
import { useFormContext } from "react-hook-form";


export default function Filter() {

  const form = useFormContext()

  const filterSubmit = (data: any) => console.log("filter datas", data);

  console.log('form watch', form.watch('date'))

  return (
    <div className="filter">
      <div className="filter-container">
        <div className="filter-inner flex gap-[40px]  items-center">
          <div className="navigation flex gap-5 items-center ml-3">
            <Link to={"/"}>
              <Badge className="px-6 py-3 rounded-[8px] bg-[#068F84] text-lg cursor-pointer hover:bg-[#FFFFFF] border border-transparent hover:text-[#068F84] hover:border-[#068F84]">
                Hospitals
              </Badge>
            </Link>
            <Link to={"/services"}>
              <Badge className="px-6 py-3 rounded-[8px] text-[#068F84] bg-[#FFFFFF] text-lg cursor-pointer hover:bg-[#FFFFFF] border border-[#E8E8E8] hover:text-[#068F84] hover:border-[#068F84]">
                Services
              </Badge>
            </Link>
          </div>

          <div className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(filterSubmit)} className="">
                <div className="flex justify-between">

                  {/* DATE */}
                  <div>
                    <FormField control={form.control}
                      name="date"
                      render={({ field }) => (
                        <div className="flex gap-7  ml-10">

                          <FormItem className="flex flex-col">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn("w-28 h-12 flex justify-between bg-[#E3F2F1] gap-3", !field.value && "text-muted-foreground")}
                                  >
                                    {field.value?.year ? years.find((years) => years.name === field.value?.year)?.name : "Year"}
                                    <img src={Vector} alt="" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search year" />
                                  <CommandList>
                                    <CommandEmpty>No year found.</CommandEmpty>

                                    <CommandGroup>
                                      {years.map((item: { name: string, id: number }) => (
                                        <CommandItem
                                          value={item.name}
                                          key={item.name}
                                          onSelect={() => {
                                            form.setValue("date", { ...form.watch("date"), year: item.name })
                                          }}
                                        >
                                          <Check className={cn("mr-2 h-4 w-4", item.name === field.value?.year ? "opacity-100" : "opacity-0")} />
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

                          <FormItem className="flex flex-col">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button variant="outline" role="combobox"
                                    className={cn("w-28 h-12 flex justify-between bg-[#E3F2F1] gap-3", !field.value && "text-muted-foreground")}
                                  >
                                    {field.value?.month
                                      ? months.find(
                                        (months) => months.name === field.value?.month
                                      )?.name
                                      : "Month"}
                                    <img src={Vector} alt="" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search month..." />
                                  <CommandList>
                                    <CommandEmpty>No month found.</CommandEmpty>

                                    <CommandGroup>
                                      {months.map((item: { name: string, id: number }) => (
                                        <CommandItem
                                          value={item.name}
                                          key={item.name}
                                          onSelect={() => {
                                            form.setValue("date", { ...form.watch("date"), month: item.name })
                                          }}
                                        >
                                          <Check className={cn("mr-2 h-4 w-4", item.name === field.value?.year ? "opacity-100" : "opacity-0")} />
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

                          <FormItem className="flex flex-col">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn("w-28 h-12 flex justify-between bg-[#E3F2F1] gap-3", !field.value && "text-muted-foreground")}
                                  >
                                    {field.value?.day
                                      ? days.find(
                                        (days) => days.name === field.value?.day
                                      )?.name
                                      : "Day"}
                                    <img src={Vector} alt="" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search day..." />
                                  <CommandList>
                                    <CommandEmpty>No day found.</CommandEmpty>

                                    <CommandGroup>
                                      {days.map((item: { name: string, id: number }) => (
                                        <CommandItem
                                          value={item.name}
                                          key={item.name}
                                          onSelect={() => {
                                            form.setValue("date", { ...form.watch("date"), day: item.name })
                                          }}
                                        >
                                          <Check className={cn("mr-2 h-4 w-4", item.name === field.value?.year ? "opacity-100" : "opacity-0")} />
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
                        </div>
                      )}
                    />
                  </div>


                  {/* MODES */}
                  <div className="flex justify-end ml-auto gap-7 ">
                    <div>
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormControl>
                            <Button
                              {...field}
                              className="px-6 py-6 flex justify-between text-sm gap-2 font-semibold bg-[#068F84] border border-[#E8E8E8]"
                              onClick={() => console.log('Price data:', form.watch('price'))}
                            >
                              Price
                              <span>
                                <img width={22} src={Price} alt="" />
                              </span>
                            </Button>
                          </FormControl>
                        )}
                      />

                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="count"
                        render={({ field }) => (
                          <FormControl>
                            <Button
                              {...field}
                              className="px-6 py-6 flex justify-between text-sm gap-2 font-semibold bg-white border border-[#E8E8E8] text-[#7A7A7A]"
                              onClick={() => console.log('Count data:', form.watch('count'))}
                            >
                              Count
                              <span>
                                <img width={22} src={Count} alt="" />
                              </span>
                            </Button>
                          </FormControl>
                        )}
                      />

                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="patients"
                        render={({ field }) => (
                          <FormControl>
                            <Button
                              {...field}
                              className="px-6 py-6 flex justify-between text-sm gap-2 font-semibold bg-white border border-[#E8E8E8] text-[#7A7A7A]"
                              onClick={() => console.log('Patients data:', form.watch('patients'))}
                            >
                              Patients
                              <span>
                                <img width={22} src={Patients} alt="" />
                              </span>
                            </Button>
                          </FormControl>
                        )}
                      />

                    </div>
                  </div>

                </div>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </div>
  );
}
