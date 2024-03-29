import { Badge } from "@/common/components/ui/badge";
import { Link } from "react-router-dom";
import { Form, FormField, FormItem } from "@/common/components/ui/form";
import { useForm } from "react-hook-form";
import { SelectBox } from "./components/select-box";
import { months, years } from "@/common/static";
import { Button } from "../ui/button";
import Count from '../../../../public/icons/count.svg'
import Price from '../../../../public/icons/price.svg'
import Patients from '../../../../public/icons/patients.svg'

export default function Filter() {
  const form = useForm();
  const filterSubmit = (data: any) => console.log("filter datas", data);
  return (
    <div className="filter">
      <div className="filter-container">
        <div className="filter-inner flex gap-[40px]  items-center">


          <div className="navigation flex gap-5 items-center ml-3">
            <Link to={"/"}>
              <Badge className="px-6 py-3 rounded-[8px] bg-[#068F84] text-lg cursor-pointer hover:bg-[#FFFFFF] border border-transparent hover:text-[#068F84] hover:border-[#068F84]">
                Hospitals
              </Badge>
            </Link>
            <Link to={"/services"}>
              <Badge className="px-6 py-3 rounded-[8px] text-[#068F84] bg-[#FFFFFF] text-lg cursor-pointer hover:bg-[#FFFFFF] border border-[#E8E8E8] hover:text-[#068F84] hover:border-[#068F84]">
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
                  render={({ }) => (
                    <FormItem>
                      <SelectBox className="" multiple={false} onSelect={() => { }} name={'Year'} data={years} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="month"
                  render={({ }) => (
                    <FormItem>
                      <SelectBox className="" multiple={false} onSelect={() => { }} name={'Month'} data={months} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="day"
                  render={({ }) => (
                    <FormItem>
                      <SelectBox className="" multiple={false} onSelect={() => { }} name={'Day'} data={[]} />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>



          <div className="flex justify-end ml-auto gap-5">
            <div ><Button size={"default"} className="gap-2 py-6 px-5 text-base bg-[#068F84]">Price <span><img width={22} className="text-white" src={Price} alt="" /></span></Button></div>
            <div><Button size={"lg"} variant={"outline"} className="gap-2 py-6 px-5  text-base">Count <span><img width={22} src={Count} alt="" /></span></Button></div>
            <div><Button size={"lg"} variant={"outline"} className="gap-2 py-6 px-5  text-base">Number of patients <span><img width={22} src={Patients} alt="" /></span></Button></div>
          </div>



        </div>
      </div>
    </div>
  );
}
