import crypto from 'node:crypto';

export class Signature {
	constructor(private apiKey: string, private merchantId: string) {}

	public generateSignature(payload: string) {
		const sign = crypto
			.createHash('md5')
			.update(Buffer.from(payload).toString('base64') + this.apiKey)
			.digest('hex');

		return {
			merchant: this.merchantId,
			sign,
		};
	}
}
