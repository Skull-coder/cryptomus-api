export interface IPaymentCreate {
	amount: string;
	currency: string;
	order_id: string;

	network?: string;
	url_return?: string;
	url_callback?: string;
	is_payment_multiple?: boolean;
	lifetime?: string;
	to_currency?: string;
}

export interface IPaymentInfo {
	uuid?: string;
	order_id?: string;
}

export interface IWalletCreate {
	netword: string;
	currency: string;
	order_id: string;
	url_callback?: string;
}
