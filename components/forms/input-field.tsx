import React, { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export interface InputFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	placeholder?: string;
	name: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
	({ className, name, placeholder = '', ...props }, ref) => {
		const form = useFormContext();

		return (
			<FormField
				control={form.control}
				name={name}
				render={({ field }) => (
					<FormItem className={className}>
						<FormControl>
							<Input
								className={cn(
									form.formState.errors[name] &&
										'border-destructive ring-destructive focus-visible:ring-destructive focus-visible:ring-2'
								)}
								placeholder={placeholder}
								{...field}
								ref={ref}
								onChange={(e) => {
									form.setValue(name, e.target.value);
									form.trigger(name);
								}}
								{...props}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		);
	}
);

InputField.displayName = 'InputField';
export { InputField };