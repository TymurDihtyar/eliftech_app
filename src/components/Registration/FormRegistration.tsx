import { useForm } from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {userService} from "@/services/userService.ts";
import {EWhereHear} from "@/enums/whereHear.enum.ts";
import {toast} from "react-toastify";
import {toastifyParam} from "@/constants/tostifyParamers.ts";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().regex(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/),
    birthDate: z.date({
        required_error: "A date of birth is required.",
    }),
    whereHear: z.nativeEnum(EWhereHear, {
        required_error: "You need to select a notification type.",
    }),
});

const FormRegistration = () => {
    const navigate = useNavigate();
    const { id } = useParams<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const event_id = Number(id);
        try {
            await userService.createUser({...values, event_id});
            navigate(`/users/${id}`);
            form.reset();
        } catch (error: any) {
            toast.error(`${error.response?.data?.message || error.message}`, toastifyParam);
        }
    };

    return (
        <Card className="w-[450px]">
            <CardHeader>
                <CardTitle>Event Registration</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="whereHear"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Where did you hear about this event?</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="social_media" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Social media
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="friends" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Friends
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="found_myself" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Found myself
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='w-full flex justify-end'>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export { FormRegistration };
