import { Fetcher } from '@/services/api/requests.ts'
import { filterEndpoints } from "@/services/api/endpoints.ts";
import { Button } from "@/common/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/common/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/common/components/ui/form";
import { PopoverContent } from "@/common/components/ui/popover";
import { useFilterStore } from "@/store";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/common/lib/utils";
import { useFieldArray, useFormContext } from 'react-hook-form';
import Vector from '/icons/vector.svg'
import useSWRMutation from "swr/mutation"
import useSWR from "swr";
import axios from 'axios';

const CompareAllHospitals = () => {

    const { filter, setFilter } = useFilterStore();
    const { data: hospitalsData } = useSWR(
        filter?.hospitals
            ? filterEndpoints.hospitals
            : null,
        Fetcher);

    useEffect(() => {
        {
            setFilter({
                hospitals: 'hospitals',
                year: undefined,
                month: undefined,
                services: undefined
            })
        }
    }, [])


    const form = useFormContext()
    useFieldArray({ name: 'hospital_ids', control: form.control })


    const postData = async (path: string, { arg }: { arg: unknown }) => (await axios.post(path, arg)).data;

    console.log()

    const url = 'https://medicalprojectback-production.up.railway.app/hospitals/services/line-bar/'

    const { data: AllDatas, trigger: posting } = useSWRMutation(form.getValues() ? url : null, postData)
    console.log(AllDatas)
    console.log()

    const testFn = async () => {
        try {
            const postedData = form.getValues()
            await posting(postedData)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { testFn() }, [form.formState])

    const max = AllDatas?.max_count

    return (
        <div>
            <h3 className="text-center text-sm mb-2 text-[#068F84]">Compare hospitals by all services based on price</h3>
            <div className="border rounded-lg p-3 h-96 ">
                <div className="w-full">
                    <Form {...form}>
                        <form className="">
                            <div className="flex justify-between ">

                                <div className='w-full'>
                                    <FormField control={form.control}
                                        name="hospital_ids"
                                        render={({ field }) => (
                                            <div className="flex gap-7  ml-1 ">
                                                <FormItem className="flex flex-col w-full">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn("w-full h-10 flex justify-center bg-[#E3F2F1] gap-3", !field.value && "text-muted-foreground")}
                                                                >
                                                                    {field.value ? hospitalsData.find((hospital: any) => field.value.includes(hospital.id))?.name : "Hospital"}
                                                                    <img src={Vector} alt="" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[200px] p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search hospital" />
                                                                <CommandList>
                                                                    <CommandEmpty>No hospital found.</CommandEmpty>

                                                                    <CommandGroup>
                                                                        {hospitalsData?.map((item: { name: string, id: number }) => (
                                                                            <CommandItem
                                                                                value={item.name}
                                                                                key={item.name}
                                                                                onSelect={() => {
                                                                                    const currValues = form.watch('hospital_ids');
                                                                                    if (!currValues.includes(item.id)) {
                                                                                        form.setValue('hospital_ids', [...currValues, item.id]);
                                                                                    } else {
                                                                                        form.setValue('hospital_ids', currValues.filter((val: any) => val !== item.id));
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <Check className={cn("mr-2 h-4 w-4", field.value?.find((id: number) => id === item.id) ? "opacity-100" : "opacity-0")} />
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
                            </div>
                        </form>
                    </Form>
                </div>

                <div className="scroll overflow-y-auto h-80">
                    <ul>
                        {AllDatas?.statistics?.map((item :any, index: number) => {
                            return (
                                <div key={index} className="flex justify-between items-center mt-3 px-5 text-sm">
                                    <li className="">{index + 1}</li>
                                    <li className="w-40 text-end">{item?.name}</li>
                                    <div className="w-[11rem] pl-2">
                                        <div className="bg-[#d8d8d8] rounded h-3">
                                            <div className="bg-gray-600 h-3 rounded" style={{ width: `${(item?.data / max) * 100}%` }}></div>
                                        </div>
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

export default CompareAllHospitals;
