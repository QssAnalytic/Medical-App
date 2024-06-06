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
import { days, months, years } from "@/common/static";
import { useFormContext } from "react-hook-form";
import { TDay, TMonth, TYear } from "@/pages/hospitals/types";
import useAuthStore from "@/services/store/authStore";
import { Role } from "@/common/types";
import { useEffect } from "react";
import { BiSolidDownArrow } from "react-icons/bi";

export default function Filter() {
  const form = useFormContext();
  const { user, signOut } = useAuthStore();
  const { pathname } = useLocation();

  useEffect(() => {
    if (user?.role === "admin" || user?.role === "superuser") {
      document.documentElement.setAttribute("data-theme", "admin");
    } else if (user?.role === "financer") {
      document.documentElement.setAttribute("data-theme", "price");
    } else if (user?.role === "manager") {
      document.documentElement.setAttribute("data-theme", "count");
    }
  }, [user?.role]);

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
                  pathname === "/"
                    ? "bg-activeNav border-transparent"
                    : "bg-backg  border-filterBorder text-nonActiveNavText"
                }  text-lg cursor-pointer hover:bg-[#FFFFFF] border hover:text-nonActiveNavText hover:border-[#068F84]`}>
                Xəstəxanalar
              </Badge>
            </Link>
            <Link to={"/services"}>
              <Badge
                className={`px-6 py-3 rounded-[8px] ${
                  pathname === "/services"
                    ? "bg-activeNav border-transparent"
                    : "bg-backg text-nonActiveNavText border-filterBorder"
                }  text-lg cursor-pointer hover:bg-[#FFFFFF] border hover:text-nonActiveNavText hover:border-[#068F84]`}>
                Xidmətlər
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
                                      "w-28 h-12 flex justify-between bg-filter border border-filterBorder text-activeNavText gap-3",
                                      !field.value && "text-activeNavText",
                                    )}>
                                    {field.value?.year
                                      ? years.find((years) => years.data === field.value?.year)?.data
                                      : "İl"}
                                    <BiSolidDownArrow className="text-icon" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Axtar..." />
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
                                    disabled={!form.watch("dates")?.year}
                                    role="combobox"
                                    className={cn(
                                      "w-36 h-12 flex justify-between bg-filter gap-3 border border-filterBorder text-activeNavText",
                                      !field.value && "text-activeNavText",
                                    )}>
                                    {field.value?.month
                                      ? months.find((months) => months.id === field.value?.month)?.data
                                      : "Ay"}
                                    <BiSolidDownArrow className="text-icon" />
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
                                    disabled={!form.watch("dates")?.month}
                                    role="combobox"
                                    className={cn(
                                      "w-28 h-12 flex justify-between bg-filter border border-filterBorder gap-3 text-activeNavText",
                                      !field.value && "text-activeNavText",
                                    )}>
                                    {field.value?.day
                                      ? days.find((days) => days.data === field.value?.day)?.data
                                      : "Gün"}
                                    <BiSolidDownArrow className="text-icon" />
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
                                          }} className="flex gap-1">
                                          <Check
                                            size={15}
                                            className={cn(item.data === field.value?.day ? "opacity-100" : "opacity-0")}
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
                          {user?.role === Role.SuperUser || user?.role === Role.Admin ? (
                            <>
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
                                    Gəlir
                                    <CircleDollarSign size={20} />
                                  </Button>
                                </FormControl>
                              </FormItem>
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
                                    Xidmətlərin sayı
                                    <FileSearch size={20} className="hover:text-[#068F84]" />
                                  </Button>
                                </FormControl>
                              </FormItem>
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
                                    Xəstə sayı
                                    <PiUsersLight size={20} />
                                  </Button>
                                </FormControl>
                              </FormItem>
                            </>
                          ) : null}
                          {user?.role === Role.Manager ? (
                            <h1 className="text-mainText text-[30px]">Xidmətlərin Satış Paneli</h1>
                          ) : null}
                          {user?.role === Role.Financer ? (
                            <h1 className="text-mainText text-[30px]">Ümumi Gəlir Paneli</h1>
                          ) : null}
                        </div>
                      )}
                    />
                  </div>
                  <div className="log-out">
                    <Button
                      className="px-6 py-6 bg-activeNav flex justify-between text-sm gap-2 font-semibold"
                      onClick={handleLogOut}>
                      Çıxış
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
