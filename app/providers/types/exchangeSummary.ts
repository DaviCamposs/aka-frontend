export interface IExchangeSummaryItem {
    code_source: string
    code_destination: string
    acronym: string
    average: number
    min: number,
    max: number
}


export interface IExchangeSummary {
    day: string,
    data: IExchangeSummaryItem[]
}