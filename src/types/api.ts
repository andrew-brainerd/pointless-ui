export interface ConnectData {
  category: string,
  title: string,
  message: string
}
export interface ListResponse<T> {
  items: Array<T>,
  pageNum: number,
  pageSize: number,
  totalItems: number,
  totalPages: number
}
