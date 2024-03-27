import * as React from "react";
import { TriangleDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/common/lib/utils";
import { Button } from "@/common/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/common/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/common/components/ui/popover";
import { CommandList } from "cmdk";
import { TSelectItem, TSelectProps } from "@/common/types";

export function SelectBox({ name, data, className, selectedItems, setSelectedItems }: TSelectProps & { selectedItems: string[], setSelectedItems: React.Dispatch<React.SetStateAction<string[]>> }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("py-6  px-7 text-base w-full bg-[#E3F2F1] border border-[#E8E8E8] hover:border-[#70BFB9] hover:text-[#048076] hover:bg-[#D4F8F6]",className)}
        >
          {value ? data.find((item: TSelectItem) => item.data === value)?.data : `${name}`}
          <TriangleDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command>
          <CommandInput placeholder={`Search ${name.toLowerCase()}...`} className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandList className=" h-[200px] overflow-y-scroll eee">
            <CommandGroup >
              {data?.map((item: TSelectItem) => (
                <CommandItem
                className="hover:cursor-pointer"
                  key={item.index}
                  value={item.data}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    if (selectedItems?.includes(currentValue)) {
                      setSelectedItems(selectedItems.filter(item => item !== currentValue));
                    } else {
                      setSelectedItems([...selectedItems, currentValue]);
                    }
                  }}>
                  {item.data}
                  <CheckIcon className={cn("ml-auto h-4 w-4", selectedItems?.includes(item.data) ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
