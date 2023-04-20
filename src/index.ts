import axios, { AxiosError } from 'axios';
import { API_URL, CREATE_PAYMENT } from './consts';
import { Signature } from './signature';
import { ICreatePayment } from './types';

export class CryptomusApi {
	private signature: Signature;

	constructor(private apiKey: string, private merchantId: string) {
		this.signature = new Signature(this.apiKey, this.merchantId);
	}

	async request<T>(method: string, payload: T) {
		try {
			const { data } = await axios.post(API_URL + method, payload, {
				headers: this.signature.generateSignature(JSON.stringify(payload)),
			});
			return data;
		} catch (err) {
			if (err instanceof AxiosError) {
				console.error(err.response.data);
				throw new Error(err.response.data);
			}
		}
	}

	async createPayment(data: ICreatePayment) {
		return this.request<ICreatePayment>(CREATE_PAYMENT, data);
	}
}
