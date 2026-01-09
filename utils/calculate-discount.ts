export const calculateDiscountPercent = (
	cost: number,
	withDiscount: number,
	showMinus = false
) => `${showMinus && '-'}${Math.round(100 * (1 - withDiscount / cost))}%`;