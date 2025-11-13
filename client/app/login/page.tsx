'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface loginState {
    studentid: string
    password: string
}

const formSchema = z.object({
    studentid: z.string()
        .regex(/[0-9]/, "Student ID should only contain numbers."),
    password: z.string()
        .regex(/[A-Z]/, "Password should contain at least 1 uppercase letter")
        .regex(/[0-9]/, "Password should contain at least 1 number")
        .regex(/^\S*$/, "Password should not contain any spaces")
})

export default function login() {
    const router = useRouter()
    const form = useForm<loginState>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentid: "",
            password: ""
        }
    })

    const handleSubmit = () => {
        router.push("/home")
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-[rgb(50,70,70)]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3 rounded-3xl px-15 p-10 w-130 flex flex-col items-center bg-[rgb(200,220,220)]">
                    <div className="flex flex-col items-center mb-10">
                        <img className="w-15 mb-3" src="globe.svg" alt="logo" />
                        <h1 className="text-center text-3xl font-extrabold tracking-tight">
                            Login
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Your Gateway to Knowledge
                        </p>
                    </div>
                    <div className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name="studentid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-md font-mediumbold">Student ID</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="bg-white" placeholder="Enter your Student ID" maxLength={6} {...field} />
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
                                    <FormLabel className="text-md font-mediumbold">Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" className="bg-white" placeholder="Enter your Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="flex gap-2 items-center">
                            <Checkbox className="bg-white" id="remember" />
                            <Label htmlFor="remember">Remember Me</Label>
                        </div>
                        <Link href="/forgotpassword"><small className="text-sm leading-none font-medium text-green-700">Forgot Password?</small></Link>
                    </div>
                    <Button className="bg-blue-700 rounded-full text-lg px-10 hover:bg-blue-600 cursor-pointer" type="submit">Login</Button>
                    <div className="w-full flex justify-center mt-3">
                        <small className="text-sm leading-none font-medium">Don't have an account? <Link className="text-green-700" href="/signup">Sign up</Link></small>
                    </div>
                </form>
            </Form>
        </div>
    )
}git 