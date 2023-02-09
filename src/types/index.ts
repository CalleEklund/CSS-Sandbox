export interface ImockDataEntry {
    key: string,
    values: string[],
    twPrefix: string
}

export interface ImockData {
    group: string,
    members: ImockDataEntry[]
}