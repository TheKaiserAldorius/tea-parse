export const getLastUrlSegment = (url: string) => {
	return url.startsWith('http') ? url.split('/').at(-1) || '' : url;
};