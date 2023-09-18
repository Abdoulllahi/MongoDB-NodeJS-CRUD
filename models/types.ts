export interface IResponse<T> {
    success: boolean,
    message?: unknown,
    data?: T,
}