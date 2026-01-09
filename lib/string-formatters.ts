export const transformToNumericFormat = (str: string, isFloat = false) => {
	const value = str.replace(',', '.');
	const digits = value.replace(/[^\d.]/g, '').split('.');

	const int = digits[0];
	const rem = digits[1];

	const res = [];

	for (let i = int.length; i > 0; i -= 3) {
		res.push(int.slice(Math.max(0, i - 3), i));
	}

	let resInt = res.reverse().join(' ');

	if (!isFloat) return resInt;

	if (value.includes('.')) resInt += '.';
	return resInt.concat(rem ? rem : '');
};

export const transformToPrettifyingNumeric = (num: number) => {
	const map = [
		{ exp: 1e3, label: 'K' },
		{ exp: 1e6, label: 'M' },
		{ exp: 1e9, label: 'B' },
		{ exp: 1e12, label: 'T' },
	];

	for (let i = 0; i < map.length; i++) {
		if (num < map[i].exp) {
			if (i === 0) {
				return [num.toString(), ''];
			}
			return [(num / map[i - 1].exp).toFixed(1), map[i - 1].label];
		}
	}

	return ['Too big number', ''];
};

export const transformToDateFormat = (str: string) => {
	const digits = str.replace(/[^\d]/g, '');

	if (digits.length <= 2) return digits;
	if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
	return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4, 8)}`;
};

export const transformToContractNmbFormat = (str: string) => {
	const digits = str.replace(/[^\d]/g, '').slice(0, 9);
	const res = [];

	for (let i = 0; i < digits.length; i += 3) {
		res.push(digits.slice(i, Math.max(0, i + 3)));
	}

	return res.join(' ');
};

export const transformToCampaignFormDate = (date: string) => {
	const dateObj = new Date(date);

	const day = dateObj.getDate().toString().padStart(2, '0');
	const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
	const year = dateObj.getFullYear();

	return `${day}.${month}.${year}`;
};