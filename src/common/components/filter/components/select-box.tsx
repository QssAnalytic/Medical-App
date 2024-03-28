import { TriangleDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/common/lib/utils";
import { Button } from "@/common/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/common/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/common/components/ui/popover";
import { CommandList } from "cmdk";
import { TSelectItem, TSelectProps } from "@/common/types";
import { useState } from "react";

export function SelectBox({ name, data, className, multiple, onSelect }: TSelectProps) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<TSelectItem[]>([]);

  const handleSelect = (currentValue: TSelectItem) => {
    if (multiple) {
      setSelectedValues(prevSelected => {
        const isSelected = prevSelected.includes(currentValue);
        if (isSelected) {
          return prevSelected.filter(value => value !== currentValue);
        } else {
          return [...prevSelected, currentValue];
        }
      });
    } else {
      setSelectedValues([currentValue]);
      setOpen(false);
    }
    onSelect(currentValue); 
  };

  const isSelected = (value: string) => {
    return selectedValues.includes(value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("py-6 px-7 text-base w-full bg-[#E3F2F1] border border-[#E8E8E8] hover:border-[#70BFB9] hover:text-[#048076] hover:bg-[#D4F8F6]", className)}
        >
          { `${name}`}
          <TriangleDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${name.toLowerCase()}...`} className="h-9" />
          {data.length === 0 && <CommandEmpty>No framework found.</CommandEmpty>}
          <CommandList className="h-[200px] overflow-y-scroll eee">
            <CommandGroup >
              {data?.filter((item: TSelectItem) => item.data.toLowerCase()).map((item: TSelectItem) => (
                <CommandItem
                  className="ITEMS hover:cursor-pointer"
                  key={item.index}
                  value={item.data}
                  onSelect={() => handleSelect(item.data)}>
                  {item.data}
                  {multiple && <CheckIcon className={cn("ml-auto h-4 w-4", isSelected(item.data) ? "opacity-100" : "opacity-0")} />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
