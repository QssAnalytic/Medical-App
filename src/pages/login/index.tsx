import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/common/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import { SignInSchema } from "./models";
import useAuthStore from "@/services/store/authStore";
import { useEffect } from "react";

const Login = () => {
  const { signIn, user } = useAuthStore();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    signIn(values);
    console.log(values);
  }

  useEffect(() => {
    console.log("user", user);
  }, [user]);
  return (
    <div className="relative font-inter">
      <div className="bg-contain  bg-no-repeat w-full h-screen absolute top-0 left-0 bg-[url('/images/LoginBG.svg')]">
        <div className="flex h-full ">
          <div className="bg-[#068F84C4] w-1/2 h-full bg-opacity-75"></div>
          <div className="bg-white w-1/2 h-full flex items-center justify-center ">
            <div className=" flex flex-col  w-2/3">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="">
                    <div>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">E-mail adress</FormLabel>
                            <FormControl className="bg-[#FBFBFB]">
                              <Input {...field} type="email" placeholder="" />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-3">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className=" space-y-0">
                            <FormLabel className="text-base  ">Password</FormLabel>
                            <FormControl className="bg-[#FBFBFB] ">
                              <Input {...field} placeholder="" type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button className="text-sm mt-2 text-[#068F84] bg-white hover:bg-white">
                        Forgotten password{" "}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-[#068F84] text-lg ">
                    Sign In
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
