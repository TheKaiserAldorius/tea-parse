'use server';

import { ReturnButton } from './return-button';

const PageHeader = ({ header }: { header: string }) => {
	return (
		<section className="relative flex flex-col justify-center">
			<ReturnButton />
			<h1 className="font-marck text-primary text-center text-4xl">{header}</h1>
		</section>
	);
};

export default PageHeader;