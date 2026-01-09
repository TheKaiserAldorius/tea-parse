export const convertToBase64 = async (file: File): Promise<string> => {
	return new Promise((res, rej) => {
		const reader = new FileReader();

		reader.onloadend = () => res(reader.result?.toString() || '');
		reader.onerror = (err) => rej(err);
		reader.readAsDataURL(file);
	});
};

export const convertFromBase64 = (content: string, type: string) => {
	const decodedData = atob(content);
	const arrayBuffer = new ArrayBuffer(decodedData.length);
	const uint8Array = new Uint8Array(arrayBuffer);

	for (let i = 0; i < decodedData.length; i += 1) {
		uint8Array[i] = decodedData.charCodeAt(i);
	}

	return new Blob([arrayBuffer], { type: type.slice(5, -7) });
};