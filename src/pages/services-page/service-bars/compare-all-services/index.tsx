import { Button } from "@/common/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/common/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/common/components/ui/form";
import { PopoverContent } from "@/common/components/ui/popover";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Check } from "lucide-react";
import { cn } from "@/common/lib/utils";
import { useFormContext } from "react-hook-form";
import Vector from "/icons/vector.svg";



const CompareAllServicesbars = () => {
  const form = useFormContext();
  return (
    <div>
      <h3 className="text-center text-sm mb-2 text-[#068F84]">Compare hospitals by all services based on price</h3>
      <div className="border rounded-lg p-3 h-96 ">
        <div className="w-full">
          <Form {...form}>
            <form className="flex justify-between">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="service_id"
                  render={({ }) => (
                    <FormItem className="flex flex-col w-full">
                      <Popover >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full h-10 flex justify-center bg-[#E3F2F1] gap-3",)}>
                              Services
                              <img src={Vector} alt="" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search service" />
                            <CommandList>
                              <CommandEmpty>No service found.</CommandEmpty>
                              <CommandGroup>

                                <CommandItem
                                  value=''
                                  key=''
                                  onSelect={() => { }}>
                                  <Check className={cn("mr-2 h-4 w-4")} />
                                  data
                                </CommandItem>
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

        {/* <div className="scroll overflow-y-auto h-80">
          <ul>

            return (
            <div className="flex justify-between items-center mt-3 px-5 text-sm">
              <li className="">test</li>
              <li className="w-40 text-end">test</li>
              <div>
                <div className="w-[11rem] pl-2">
                  <div className="bg-[#d8d8d8] rounded h-3">
                    <div
                      className="h-3 rounded"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            );
            ) : (
            <div className="flex h-80 justify-center items-center">
              <LoaderCircle size={50} className="animate-spin text-[#1EA66D]" />
            </div>
            )
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default CompareAllServicesbars;
