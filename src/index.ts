import axios, { AxiosError } from 'axios';
import {
	API_URL,
	GET_BALANCE,
	PAYMENT_CREATE,
	PAYMENT_HISTORY,
	PAYMENT_INFO,
	PAYMENT_RESEND,
	PAYMENT_SERVICES,
	WALLET_CREATE,
} from './consts';
import { Signature } from './signature';
import { IPaymentCreate, IPaymentInfo, IWalletCreate } from './types';

export class CryptomusApi {
	private signature: Signature;

	constructor(private apiKey: string, private merchantId: string) {
		this.signature = new Signature(this.apiKey, this.merchantId);
	}

	async request<T>(method: string, payload?: T) {
		try {
			const { data } = await axios.post(API_URL + method, payload, {
				headers: this.signature.generateSignature(JSON.stringify(payload)),
			});
			return data;
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response.data);
			}
		}
	}

	async getServices() {
		return this.request(PAYMENT_SERVICES);
	}

	async createPayment(data: IPaymentCreate) {
		return this.request<IPaymentCreate>(PAYMENT_CREATE, data);
	}

	async paymentInfo(data: IPaymentInfo) {
		if (!data.uuid && !data.order_id) {
			throw new Error('One of the parameters is required');
		}
		return this.request<IPaymentInfo>(PAYMENT_INFO, data);
	}

	async paymentsHistory() {
		return this.request(PAYMENT_HISTORY);
	}

	async getBalance() {
		return this.request(GET_BALANCE);
	}

	async reSendNotifications(data: IPaymentInfo) {
		if (!data.uuid && !data.order_id) {
			throw new Error('One of the parameters is required');
		}
		return this.request<IPaymentInfo>(PAYMENT_RESEND, data);
	}

	async createWallet(data: IWalletCreate) {
		return this.request<IWalletCreate>(WALLET_CREATE, data);
	}
}
