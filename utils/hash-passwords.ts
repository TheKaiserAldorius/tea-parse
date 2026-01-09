import { createCipheriv, createDecipheriv } from 'crypto';
import { env } from '@/env';
import bcrypt from 'bcrypt';

const SALT_OR_ROUNDS = 10;

export const hashPassword = async (password: string) => {
	return bcrypt.hash(password, SALT_OR_ROUNDS);
};

export const encrypt = (text: string) => {
	const keyBuffer = Buffer.from(env.KEY, 'hex');
	const ivBuffer = Buffer.from(env.IV, 'hex');

	const cipher = createCipheriv(env.ALGORITHM, keyBuffer, ivBuffer);

	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return encrypted.toString('hex');
};

export const decrypt = (encryptedData: string) => {
	const ivBuffer = Buffer.from(env.IV, 'hex');
	const keyBuffer = Buffer.from(env.KEY, 'hex');

	const encryptedText = Buffer.from(encryptedData, 'hex');
	const decipher = createDecipheriv(env.ALGORITHM, keyBuffer, ivBuffer);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
};

export const comparePassword = async (
	password: string,
	hashedPassword: string
) => {
	return await bcrypt.compare(password, hashedPassword);
};