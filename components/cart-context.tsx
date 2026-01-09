'use client';

import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';

import { TLocalCartItem } from '@/lib/types/local-cart';

type TLocalCartContext = {
	localCart: TLocalCartItem[];
	setLocalCart: Dispatch<SetStateAction<TLocalCartItem[]>>;
};

const LocalCartContext = createContext<TLocalCartContext>({
	localCart: [],
	setLocalCart: () => {},
});

export const LocalCartProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [localCart, setLocalCart] = useState<TLocalCartItem[]>(
		typeof window !== 'undefined'
			? JSON.parse(localStorage.getItem('cart') || '[]')
			: []
	);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(localCart));
	}, [localCart]);

	return (
		<LocalCartContext.Provider value={{ localCart, setLocalCart }}>
			{children}
		</LocalCartContext.Provider>
	);
};

export const useLocalCart = () => useContext(LocalCartContext);