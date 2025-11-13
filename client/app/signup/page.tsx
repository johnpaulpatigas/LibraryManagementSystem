'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { MoveLeft } from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface signupState {
    name: string
    studentid: string
    email: string
    password: string
}

const formSchema = z.object({
    name: z.string(),
    studentid: z.string()
        .regex(/[0-9]/, "Student ID should only contain numbers."),
    email: z.string(),
    password: z.string()
        .regex(/[A-Z]/, "Password should contain at least 1 uppercase letter")
        .regex(/[0-9]/, "Password should contain at least 1 number")
        .regex(/^\S*$/, "Password should not contain any spaces")
})

export default function signup() {
    const router = useRouter()
    const form = useForm<signupState>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            studentid: "",
            email: "",
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
                            User Sign Up
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Your journey to Knowledge begins here
                        </p>
                    </div>
                    <div className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-md font-mediumbold">Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="bg-white" placeholder="Enter your Fullname" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                            name="studentid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-md font-mediumbold">Email</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="bg-white" placeholder="Enter your Email" {...field} />
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
                                        <Input type="password" className="bg-white" placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="mt-5 bg-blue-700 rounded-full text-lg px-10 hover:bg-blue-600 cursor-pointer" type="submit">Sign Up</Button>
                    <div className="w-full flex items-center justify-center gap-2 mt-3">
                        <small className="text-sm leading-none font-medium"><Link className="text-green-700 flex items-center justify-center gap-2" href="/login"><MoveLeft color="#3c9d2f" size={10} strokeWidth={3} />Back to Login</Link></small>
                    </div>
                </form>
            </Form>
        </div>
    )
}