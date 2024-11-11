'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { exampleSchema } from '@/lib/example-schema';

import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export default function ExampleForm() {
    const form = useForm<z.infer<typeof exampleSchema>>({
        resolver: zodResolver(exampleSchema),
        defaultValues: {
            age: 0,
            email: '',
            password: '',
        },
    });

    function onSubmit(values: z.infer<typeof exampleSchema>) {
        if (values.email === 'admin@donntu.ru' && values.password === 'admin') {
            setError('');
            return setSuccess('Successful logging in :)');
        } else {
            setSuccess('');
            return setError('Error while logging in :(');
        }
    }

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Example log in form</h3>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="example@donntu.ru"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Enter your email (hint: admin@donntu.ru)
                                </FormDescription>
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
                                <FormControl>
                                    <Input
                                        placeholder="Enter your password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Enter your password (hint: admin)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        min="0"
                                        max="150"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Enter your age
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            <div className="absolute left-1/2 top-full translate-x-[-50%] translate-y-[-200%] w-full max-w-screen-md">
                {success && (
                    <Alert variant="success">
                        <AlertDescription>{success}</AlertDescription>
                    </Alert>
                )}
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
}
