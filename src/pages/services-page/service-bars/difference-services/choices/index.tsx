import { Button } from "@/common/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/common/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/common/components/ui/form";
import { PopoverContent } from "@/common/components/ui/popover";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/common/lib/utils";
import Vector from "/icons/vector.svg";
import { useFormContext } from "react-hook-form";


const Choices = () => {

  const form = useFormContext()

  return (
    <div className="border rounded-lg  bg-white">
      <div className="w-full p-3">
        <Form {...form}>
          <form className="flex justify-between">
            <div className="w-full">
              <FormField
                control={form.control }
                name={'test' }
                render={({ }) => (
                  <FormItem className="flex flex-col w-full">
                    <Popover>
                      <div className="flex justify-end items-center gap-5">
                        <p>Services</p>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-1/2 h flex justify-center bg-[#E3F2F1] gap-3")}>
                              Hospitals
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
                              
                                <CommandItem
                                  onSelect={() => {}}>
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

      <div className="scroll overflow-y-auto h-72">
        
          <ul>
          
          </ul>
      
      </div>
    </div>
  );
};

export default Choices;
