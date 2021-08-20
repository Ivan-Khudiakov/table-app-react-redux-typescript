// selector for Paginator
export const arrayPartialSelector = <Type>(array: Type[], currentPage: number, pageSize: number): Type[] => {
    const last = currentPage * pageSize
    const first = last - pageSize
    return array.slice(first, last)
}
