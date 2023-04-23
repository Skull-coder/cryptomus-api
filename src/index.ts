import axios, { AxiosError } from 'axios';
import { API_URL, PAYMENT_REQUEST_URI } from './consts';
import { Signature } from './signature';
import { IPaymentCreate, IPaymentInfo, IWalletCreate } from './types';

export class CryptomusApi {
	private signature: Signature;

	constructor(private apiKey: string, private merchantId: string) {
		this.signature = new Signature(this.apiKey, this.merchantId);
	}

	private async request<T>(method: string, payload?: T) {
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

	public async getServices() {
		return this.request(PAYMENT_REQUEST_URI.PAYMENT_SERVICES);
	}

	public async createPayment(data: IPaymentCreate) {
		return this.request<IPaymentCreate>(PAYMENT_REQUEST_URI.PAYMENT_CREATE, data);
	}

	public async paymentInfo(data: IPaymentInfo) {
		if (!data.uuid && !data.order_id) {
			throw new Error('One of the parameters is required');
		}

		return this.request<IPaymentInfo>(PAYMENT_REQUEST_URI.PAYMENT_INFO, data);
	}

	public async paymentsHistory() {
		return this.request(PAYMENT_REQUEST_URI.PAYMENT_HISTORY);
	}

	public async getBalance() {
		return this.request(PAYMENT_REQUEST_URI.GET_BALANCE);
	}

	public async reSendNotifications(data: IPaymentInfo) {
		if (!data.uuid && !data.order_id) {
			throw new Error('One of the parameters is required');
		}

		return this.request<IPaymentInfo>(PAYMENT_REQUEST_URI.PAYMENT_RESEND, data);
	}

	public async createWallet(data: IWalletCreate) {
		return this.request<IWalletCreate>(PAYMENT_REQUEST_URI.WALLET_CREATE, data);
	}
}
