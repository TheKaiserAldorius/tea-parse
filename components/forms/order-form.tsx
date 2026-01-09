'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputMask } from '@react-input/mask';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import { InputField } from './input-field';
import { orderSchema } from './order-schema';

export const OrderForm = () => {
	const form = useForm<z.infer<typeof orderSchema>>({
		resolver: zodResolver(orderSchema),
		defaultValues: {
			username: '',
			email: '',
			phone: '',
			address: '',
			comment: undefined,
			terms: false,
		},
	});

	function onSubmit(values: z.infer<typeof orderSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-8"
			>
				<div className="flex flex-col gap-5">
					<h3 className="text-2xl">Получатель</h3>
					<div className="flex flex-col gap-4">
						<InputField name="username" placeholder="Ваше имя и фамилия" />
						<InputField name="email" placeholder="Ваш e-mail" />

						<InputMask
							mask="+7 (___) ___-__-__"
							replacement={{ _: /\d/ }}
							placeholder="+7 (___) ___-__-__"
							component={InputField}
							name="phone"
							type="tel"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-5">
					<h3 className="text-2xl">Доставка</h3>
					<div className="flex flex-col gap-4">
						<InputField name="address" placeholder="Ваш адрес" />
					</div>
				</div>
				<div className="flex flex-col gap-5">
					<h3 className="text-2xl">Комментарий</h3>
					<div className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="comment"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											placeholder="Ваш комментарий к заказу"
											{...field}
											className={cn(
												form.formState.errors.comment &&
													'border-destructive focus-visible:ring-destructive focus-visible:ring-1'
											)}
											onChange={(e) => {
												form.setValue(
													'comment',
													e.target.value ? e.target.value : undefined
												);
												form.trigger('comment');
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="terms"
							render={({ field }) => (
								<FormItem className="flex items-center gap-3">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											className={cn(
												form.formState.errors.terms && 'border-destructive'
											)}
										/>
									</FormControl>
									<FormLabel>
										Я согласен на{' '}
										<Link
											className="hover:text-foreground underline"
											href="/terms"
										>
											обработку персональных данных
										</Link>
									</FormLabel>
								</FormItem>
							)}
						/>
					</div>
				</div>

				<Button
					type="submit"
					onClick={() => {
						console.log('click');
						console.log('form values', form.getValues());
						console.log('errors', form.formState.errors);
						// console.log('click')
					}}
					// disabled={!form.formState.isValid}
					className={cn(
						'mr-auto h-16 rounded-full px-12 text-lg',
						!form.formState.isValid &&
							'hover:bg-primary opacity-50 hover:cursor-default'
					)}
				>
					Оплатить заказ
				</Button>
			</form>
		</Form>
	);
};