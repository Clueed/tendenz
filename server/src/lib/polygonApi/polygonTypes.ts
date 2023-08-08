// // Aggregates
// Generic
export interface IAggs {
	ticker?: string
	adjusted?: boolean
	queryCount?: number
	request_id?: number
	resultsCount?: number
	status?: string
}

// Single
export interface IAggsResultsSingle {
	t: number
	c: number
	o: number
	h: number
	l: number
	v: number
	n?: number
	vw?: number
}
export interface IAggsSingle extends IAggs {
	results?: IAggsResultsSingle[]
}

// Multiple
export interface IAggsResultsMultiple extends IAggsResultsSingle {
	T: string
}
export interface IAggsMultiple extends IAggs {
	results?: IAggsResultsMultiple[]
}

// // Ticker Details
export interface ITickerDetails {
	request_id?: string
	results?: ITickerDetailsResults
	status?: string
}

export interface ITickerDetailsResults {
	active?: boolean
	address?: {
		address1?: string
		city?: string
		state?: string
		postal_code?: string
	}
	branding?: {
		icon_url?: string
		logo_url?: string
	}
	cik?: number
	composite_figi?: string
	currency_name?: string
	description?: string
	homepage_url?: string
	list_date?: string
	locale?: string
	market?: string
	market_cap?: number
	name?: string
	phone_number?: string
	primary_exchange?: string
	round_lot?: number
	share_class_figi?: string
	share_class_shares_outstanding?: number
	sic_code?: number
	sic_description?: string
	ticker?: string
	ticker_root?: string
	total_employees?: number
	type?: string
	weighted_shares_outstanding?: number
	source_feed?: string
}

// // Splits
export interface IStockSplits {
	next_url?: string
	request_id?: string
	results?: IStockSplitResults[]
	status?: string
}

export interface IStockSplitResults {
	execution_date: string
	split_from: number
	split_to: number
	ticker: string
}
