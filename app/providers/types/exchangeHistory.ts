export interface IExchangeHistoryItem {
    code_source: string
    code_destination: string
    acronym: string
    average: number
    min: number,
    max: number
}


export interface IExchangeHistory {
    hour: string,
    data: IExchangeHistoryItem[]
}

export interface IExchangeHistoryTableRow {
    hour: string
    average: number
    min: number,
    max: number
}

export interface IExchangeHistoryTableDTO {
    title: string
    data: IExchangeHistoryTableRow[]
}