// import { CheckIcon } from "@radix-ui/react-icons";
// import { cn } from "@/common/lib/utils";
// import { Button } from "@/common/components/ui/button";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/common/components/ui/command";
// import { Popover, PopoverContent, PopoverTrigger } from "@/common/components/ui/popover";
// import { CommandList } from "cmdk";
// import { TSelectItem, TSelectProps } from "@/common/types";
// import { useState } from "react";
// import Vector from '../../../../../public/icons/vector.svg'

// export function SelectBox({ name, data, className, multiple, onSelect }: TSelectProps) {
//   const [open, setOpen] = useState(false);
//   const [selectedValues, setSelectedValues] = useState<TSelectItem[]>([]);

//   const handleSelect = (currentValue: any) => {
//     if (multiple) {
//       setSelectedValues(prevSelected => {
//         const isSelected = prevSelected.includes(currentValue);
//         if (isSelected) {
//           return prevSelected.filter(value => value !== currentValue);
//         } else {
//           return [...prevSelected, currentValue];
//         }
//       });
//     } else {
//       setSelectedValues([currentValue]);
//       setOpen(false);
//     }
//     onSelect(currentValue);
//   };

//   const isSelected = (value: any) => {
//     return selectedValues.includes(value);
//   };

//   return (
//     <Popover>
//     <PopoverTrigger asChild>
//       <FormControl>
//         <Button
//           variant="outline"
//           role="combobox"
//           className={cn(
//             "w-[200px] justify-between",
//             !field.value && "text-muted-foreground"
//           )}
//         >
//           {field.value
//             ? languages.find(
//                 (language) => language.value === field.value
//               )?.label
//             : "Select language"}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </FormControl>
//     </PopoverTrigger>
//     <PopoverContent className="w-[200px] p-0">
//       <Command>
//         <CommandInput placeholder="Search language..." />
//         <CommandEmpty>No language found.</CommandEmpty>
//         <CommandGroup>
//           {languages.map((language) => (
//             <CommandItem
//               value={language.label}
//               key={language.value}
//               onSelect={() => {
//                 form.setValue("language", language.value)
//               }}
//             >
//               <Check
//                 className={cn(
//                   "mr-2 h-4 w-4",
//                   language.value === field.value
//                     ? "opacity-100"
//                     : "opacity-0"
//                 )}
//               />
//               {language.label}
//             </CommandItem>
//           ))}
//         </CommandGroup>
//       </Command>
//     </PopoverContent>
//   </Popover>
//   );
// }

