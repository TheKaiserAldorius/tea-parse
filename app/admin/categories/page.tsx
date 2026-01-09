'use client';

import { useRef } from 'react';
import { trpc } from '@/server/client';
import { upload } from '@vercel/blob/client';
import { toast } from 'sonner';

// import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminCategoriesPage() {
	const inputNameRef = useRef<HTMLInputElement>(null);
	const inputUrlRef = useRef<HTMLInputElement>(null);
	const inputFileRef = useRef<HTMLInputElement>(null);

	const insertCategory = trpc.category.insert.useMutation();

	const onSubmit = async () => {
		if (
			!inputFileRef.current?.files ||
			!inputNameRef.current?.value ||
			!inputUrlRef.current?.value
		) {
			throw new Error('Form values error');
		}

		const file = inputFileRef.current.files[0];

		const blob = await upload(`categories/${file.name}`, file, {
			access: 'public',
			handleUploadUrl: '/api/category/upload',
		});

		const url = blob.downloadUrl;

		insertCategory.mutateAsync(
			{
				name: inputNameRef.current.value,
				imageLink: url,
				url: inputUrlRef.current.value,
			},
			{
				onSuccess: (data) => {
					toast(data.categoryId.toString());
				},
				onError: (err) => {
					toast(err.message);
				},
			}
		);
	};

	return (
		<div className="relative">
			<div className="relative container flex flex-col gap-12 py-12">
				<Input placeholder="name" ref={inputNameRef} />
				<Input placeholder="url" ref={inputUrlRef} />
				<Input
					type="file"
					placeholder="img"
					ref={inputFileRef}
					accept="*"
					multiple={false}
				/>
				<Button onClick={onSubmit}>загрузить</Button>
			</div>
		</div>
	);
}