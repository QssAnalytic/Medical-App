import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/common/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/common/components/ui/form"
import { Input } from "@/common/components/ui/input"

const formSchema = z.object({
    e_mail: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Username must be at least 6 characters.",
    }),
})



const Login = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            e_mail: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <div className="relative">
            <div className="bg-contain  bg-no-repeat w-full h-screen absolute top-0 left-0 bg-[url('/images/LoginBG.svg')]">
                <div className="flex h-full ">
                    <div className="bg-[#068F84C4] w-1/2 h-full bg-opacity-75">
                    </div>
                    <div className="bg-white w-1/2 h-full flex items-center justify-center ">
                        <div className=" flex flex-col  w-2/3" >
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <div className="">
                                        <FormField
                                            control={form.control}
                                            name="e_mail"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>E-mail adress</FormLabel>
                                                    <FormControl className="bg-[#FBFBFB]">
                                                        <Input placeholder="" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl className="bg-[#FBFBFB]">
                                                        <Input placeholder="" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <p className="text-end text-xs mt-2">Forgotten password </p>
                                    </div>
                                    <Button type="submit" className="w-full bg-[#068F84]">Sign In</Button>
                                </form>
                                <p className="text-xs text-center mt-2">
                                    Not registered yet? <span>Create and account</span>
                                </p>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login