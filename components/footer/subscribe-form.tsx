'use client';

import { UserDataSchema } from '@/server/zod/user-data.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { SentIcon } from '@/lib/icons/icons';

import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const SubscribeSchema = UserDataSchema.pick({ email: true });

export const SubscribeForm = () => {
	const form = useForm<z.infer<typeof SubscribeSchema>>({
		resolver: zodResolver(SubscribeSchema),
		defaultValues: {
			email: '',
		},
	});

	function onSubmit(values: z.infer<typeof SubscribeSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex items-center"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormControl>
								<div className="relative flex items-center">
									<Input
										variant="navigation"
										placeholder="Ваш e-mail"
										className="w-52"
										{...field}
									/>
									<Button
										className="text-primary absolute right-1 [&_svg]:size-8"
										variant="ghost"
										size="wrapper"
										type="submit"
									>
										<SentIcon />
									</Button>
								</div>
							</FormControl>
							{!!form.getValues('email').length && (
								<FormMessage className="mx-3"></FormMessage>
							)}
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};