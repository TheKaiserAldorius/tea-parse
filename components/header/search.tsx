'use client';

// import { useState } from 'react';
import { Input } from '../ui/input';

export const Search = () => {
	// const [search, setSearch] = useState('');

	return (
		<div className="mt-0 mr-0 hidden items-center gap-3 md:flex lg:mt-10 lg:mr-auto">
			<Input variant="navigation" placeholder="Поиск" className="w-72" />
		</div>
	);
};