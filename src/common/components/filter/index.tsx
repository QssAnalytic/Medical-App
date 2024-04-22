import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, CircleDollarSign, FileSearch } from "lucide-react";
import { cn } from "@/common/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CommandList } from "cmdk";
import { PiUsersLight } from "react-icons/pi";
import Vector from "/icons/vector.svg";
import { days, months, years } from "@/common/static";
import { useFormContext } from "react-hook-form";
import { TDay, TMonth, TYear } from "@/pages/hospitals/types";
import useAuthStore from "@/services/store/authStore";
import { Role } from "@/common/types";

export default function Filter() {
  const form = useFormContext();
  const { user, signOut } = useAuthStore();
  const { pathname } = useLocation();

  const filterSubmit = (data: any) => console.log("filter datas", data);

  const handleLogOut = () => {
    signOut();
  };

  return (
    <div className="filter">
      <div className="filter-container">
        <div className="filter-inner flex gap-[40px]  items-center">
          <div className="navigation flex gap-5 items-center ml-3">
            <Link to={"/"}>
              <Badge
                className={`px-6 py-3 rounded-[8px] ${
                  pathname === "/" ? "bg-[#068F84] border-transparent" : "bg-[#FFFFFF] text-[#068F84] border-[#E8E8E8]"
                }  text-lg cursor-pointer hover:bg-[#FFFFFF] border hover:text-[#068F84] hover:border-[#068F84]`}>
                Hospitals
              </Badge>
            </Link>
            <Link to={"/services"}>
              <Badge
                className={`px-6 py-3 rounded-[8px] ${
                  pathname === "/services"
                    ? "bg-[#068F84] border-transparent"
                    : "bg-[#FFFFFF] text-[#068F84] border-[#E8E8E8]"
                }  text-lg cursor-pointer hover:bg-[#FFFFFF] border hover:text-[#068F84] hover:border-[#068F84]`}>
                Services
              </Badge>
            </Link>
          </div>

          <div className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(filterSubmit)}>
                <div className="flex justify-between gap-4">
                  {/* DATE */}
                  <div>
                    <FormField
                      control={form.control}
                      name="dates"
                      render={({ field }) => (
                        <div className="flex gap-7  ml-10">
                          <FormItem className="flex flex-col">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-28 h-12 flex justify-between bg-[#E3F2F1] gap-3",
                                      !field.value && "text-muted-foreground",
                                    )}>
                                    {field.value?.year
                                      ? years.find((years) => years.data === field.value?.year)?.data
                                      : "Year"}
                                    <img src={Vector} alt="" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search..." />
                                  <CommandList>
                                    <CommandEmpty>No year found.</CommandEmpty>
                                    <CommandGroup>
                                      {years.map((item: TYear) => (
                                        <CommandItem
                                          value={item.data.toString()}
                                          key={item.data}
                                          onSelect={() => {
                                            form.setValue("dates", { ...form.watch("dates"), year: item.data });
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

                          <FormItem>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-36 h-12 flex justify-between bg-[#E3F2F1] gap-3",
                                      !field.value && "text-muted-foreground",
                                    )}>
                                    {field.value?.month
                                      ? months.find((months) => months.id === field.value?.month)?.data
                                      : "Month"}
                                    <img src={Vector} alt="" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent>
                                <Command>
                                  <CommandInput placeholder="Search..." />
                                  <CommandList>
                                    <CommandEmpty>No month found.</CommandEmpty>

                                    <CommandGroup className="h-36 overflow-y-scroll">
                                      {months.map((item: TMonth) => (
                                        <CommandItem
                                          value={item.data}
                                          key={item.data}
                                          onSelect={() => {
                                            form.setValue("dates", { ...form.watch("dates"), month: item.id });
                                          }}>
                                          <Check
                                            className={cn(item.id === field.value?.month ? "opacity-100" : "opacity-0")}
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
                                      "w-28 h-12 flex justify-between bg-[#E3F2F1] gap-3",
                                      !field.value && "text-muted-foreground",
                                    )}>
                                    {field.value?.day
                                      ? days.find((days) => days.data === field.value?.day)?.data
                                      : "Day"}
                                    <img src={Vector} alt="" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent>
                                <Command>
                                  <CommandInput placeholder="Search..." />
                                  <CommandList>
                                    <CommandEmpty>No day found.</CommandEmpty>
                                    <CommandGroup className="h-36 overflow-y-scroll">
                                      {days.map((item: TDay) => (
                                        <CommandItem
                                          value={item.data.toString()}
                                          key={item.data}
                                          onSelect={() => {
                                            form.setValue("dates", { ...form.watch("dates"), day: item.data });
                                          }}>
                                          <Check
                                            className={cn(
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
                        </div>
                      )}
                    />
                  </div>

                  {/* MODES */}
                  <div className="flex justify-end ml-auto gap-7">
                    <FormField
                      control={form.control}
                      name="annotate_type"
                      render={({ field }) => (
                        <div className="flex gap-7">
                          {user?.role === Role.SuperUser ||
                          user?.role === Role.Admin ||
                          user?.role === Role.Financer ? (
                            <FormItem>
                              <FormControl>
                                <Button
                                  className={`px-6 py-6 flex justify-between text-sm gap-2 font-semibold  border border-transparent hover:border-[#068F84] hover:bg-white hover:text-[#068F84] ${
                                    field.value === "price"
                                      ? "bg-[#068F84] text-white"
                                      : "bg-white text-[#7A7A7A] border border-[#E8E8E8]"
                                  }`}
                                  onClick={() => {
                                    form.setValue("annotate_type", "price");
                                  }}>
                                  Price
                                  <CircleDollarSign size={20} />
                                </Button>
                              </FormControl>
                            </FormItem>
                          ) : null}

                          {user?.role === Role.Manager || user?.role === Role.SuperUser || user?.role === Role.Admin ? (
                            <FormItem>
                              <FormControl>
                                <Button
                                  className={`px-6 py-6 flex justify-between text-sm gap-2 font-semibold border border-transparent hover:border-[#068F84] hover:bg-white hover:text-[#068F84] ${
                                    field.value === "count"
                                      ? "bg-[#068F84] text-white"
                                      : "bg-white text-[#7A7A7A] border border-[#E8E8E8]"
                                  }`}
                                  onClick={() => {
                                    form.setValue("annotate_type", "count");
                                  }}>
                                  Count
                                  <FileSearch size={20} className="hover:text-[#068F84]" />
                                </Button>
                              </FormControl>
                            </FormItem>
                          ) : null}
                          {user?.role === Role.SuperUser || user?.role === Role.Admin ? (
                            <FormItem>
                              <FormControl>
                                <Button
                                  className={`px-6 py-6 flex justify-between text-sm gap-2 font-semibold border border-transparent hover:border-[#068F84] hover:bg-white hover:text-[#068F84] ${
                                    field.value === "number_patients"
                                      ? "bg-[#068F84] text-white"
                                      : "bg-white text-[#7A7A7A] border border-[#E8E8E8]"
                                  }`}
                                  onClick={() => {
                                    form.setValue("annotate_type", "number_patients");
                                  }}>
                                  Number of Patients
                                  <PiUsersLight size={20} />
                                </Button>
                              </FormControl>
                            </FormItem>
                          ) : null}
                        </div>
                      )}
                    />
                  </div>
                  <div className="log-out">
                    <Button
                      className="px-6 py-6 flex justify-between text-sm gap-2 font-semibold"
                      onClick={handleLogOut}>
                      Log Out
                    </Button>
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
