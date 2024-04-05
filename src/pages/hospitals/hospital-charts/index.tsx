import Chart from "@/common/components/charts";
// import { SelectBox } from "@/common/components/filter/components/select-box";
// import { Form, FormField, FormItem } from "@/common/components/ui/form";
// import { months, years } from "@/common/static";
// import { useForm } from "react-hook-form";

const HospitalsCharts = () => {
    // const form = useForm();
    // const filterSubmit = (data: any) => console.log("filter datas", data);
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="my-4">
                <div className="date-filters text-base">
                    {/* <Form {...form}>
                        <form onSubmit={form.handleSubmit(filterSubmit)} className="flex gap-5">
                            <FormField
                                control={form.control}
                                name="year"
                                render={({ }) => (
                                    <FormItem>
                                        <SelectBox className="text-base px-16" multiple={false} onSelect={() => { }} name={'Year'} data={years} />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="month"
                                render={({ }) => (
                                    <FormItem>
                                        <SelectBox className="text-base px-16" multiple={false} onSelect={() => { }} name={'Month'} data={months} />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form> */}
                </div>
            </div>
            <div className="w-full  flex items-center justify-between">
                <div><Chart /></div>
                <div><Chart /></div>
                <div><Chart /></div>
            </div>
        </div>
    )
}

export default HospitalsCharts