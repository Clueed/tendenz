export interface IAggs {
	ticker?: string
	adjusted?: boolean
	queryCount?: number
	request_id?: number
	resultsCount?: number
	status?: string
	results?: IAggsResults[]
}

export interface IAggsResults {
	T: string
	t: number
	c: number
	o: number
	h: number
	l: number
	v: number
	n?: number
	vw?: number
}
