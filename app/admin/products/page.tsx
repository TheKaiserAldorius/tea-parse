'use client';

import { useRef } from 'react';
import { trpc } from '@/server/client';
import { upload } from '@vercel/blob/client';
import { toast } from 'sonner';

// import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminProductsPage() {
	const inputNameRef = useRef<HTMLInputElement>(null);
	const inputUrlRef = useRef<HTMLInputElement>(null);
	const inputFileRef = useRef<HTMLInputElement>(null);

	const insertCategory = trpc.product.insert.useMutation();

	const onSubmit = async () => {
		if (!inputFileRef.current?.files || !inputNameRef.current?.value) {
			throw new Error('Form values error');
		}

		const files = inputFileRef.current.files;

		const downloaded = await Promise.all(
			Array.from(files).map((file) =>
				upload(`products/${inputNameRef.current?.value}/${file.name}`, file, {
					access: 'public',
					handleUploadUrl: '/api/category/upload',
				})
			)
		);

		const urls = downloaded.map((el) => el.downloadUrl);

		insertCategory.mutateAsync(
			{
				name: 'ЛюХуСewrю',
				categoryUrl: 'http://localhost:3000/categories/white',
				description: 'Мамай клянусь чотки чай, вот те крыст, братан',
				brewing: 'Чай всунь, воду влей, туды-сюды его пару раз и вылей в чашку',
				images: urls,
				published: true,
				toastDescription: {
					A: 'вкус1',
					AA: 'вкус2',
					'AA+': 'вкус3',
					'AA++': 'вкус4',
					AAA: 'вкус5',
				},
				price: {
					A: {
						'35': { price: 200, discount: 0 },
						'70': { price: 400, discount: 50 },
						'100': { price: 500, discount: 0 },
						'200': { price: 900, discount: 100 },
						'300': { price: 1200, discount: 150 },
					},
					AA: {
						'35': { price: 300, discount: 0 },
						'70': { price: 600, discount: 50 },
						'100': { price: 800, discount: 0 },
						'200': { price: 1300, discount: 150 },
						'300': { price: 1800, discount: 300 },
					},
					'AA+': {
						'35': { price: 400, discount: 0 },
						'70': { price: 900, discount: 100 },
						'100': { price: 1000, discount: 0 },
						'200': { price: 2000, discount: 200 },
						'300': { price: 2700, discount: 600 },
					},
					'AA++': {
						'35': { price: 600, discount: 0 },
						'70': { price: 1300, discount: 150 },
						'100': { price: 1500, discount: 0 },
						'200': { price: 3000, discount: 300 },
						'300': { price: 4000, discount: 700 },
					},
					AAA: {
						'35': { price: 900, discount: 0 },
						'70': { price: 1900, discount: 200 },
						'100': { price: 2200, discount: 0 },
						'200': { price: 4500, discount: 400 },
						'300': { price: 6000, discount: 1000 },
					},
				},
			},
			{
				onSuccess: (data) => {
					toast(data.productId.toString());
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
					multiple={true}
				/>
				<Button onClick={onSubmit}>загрузить</Button>
			</div>
		</div>
	);
}