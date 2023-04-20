export interface ICreatePayment {
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
