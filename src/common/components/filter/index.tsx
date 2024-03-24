import { Badge } from "@/common/components/ui/badge";
import { Link } from "react-router-dom";
import { Form, FormField, FormItem } from "@/common/components/ui/form";
import { useForm } from "react-hook-form";
import { SelectBox } from "./components/select-box";
import { months, years } from "@/common/static";

export default function Filter() {
  const form = useForm();

  const filterSubmit = (data: any) => console.log("filter datas", data);

  return (
    <div className="filter">
      <div className="filter-container">
        <div className="filter-inner flex gap-[40px] items-center">
          <div className="navigation flex gap-5 items-center">
            <Link to={"/"}>
              <Badge className="px-6 py-3 rounded-[8px] bg-[#00B8A9] text-lg cursor-pointer hover:bg-[#FFFFFF] border border-transparent hover:text-[#00B8A9] hover:border-[#00B8A9]">
                Hospitals
              </Badge>
            </Link>
            <Link to={"/services"}>
              <Badge className="px-6 py-3 rounded-[8px] text-[#00B8A9] bg-[#FFFFFF] text-lg cursor-pointer hover:bg-[#FFFFFF] border border-[#E8E8E8] hover:text-[#00B8A9] hover:border-[#00B8A9]">
                Services
              </Badge>
            </Link>
          </div>
          <div className="date-filters">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(filterSubmit)} className="flex gap-5">
                <FormField
                control={form.control}
                  name="year"
                  render={({}) => (
                    <FormItem>
                      <SelectBox  name={'Year'} data={years}/>
                    </FormItem>
                  )}
                />
                <FormField
                control={form.control}
                  name="month"
                  render={({}) => (
                    <FormItem>
                      <SelectBox  name={'Month'} data={months}/>
                    </FormItem>
                  )}
                />
                <FormField
                control={form.control}
                  name="day"
                  render={({}) => (
                    <FormItem>
                      <SelectBox  name={'Day'} data={[]}/>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
