

export interface HttpResponse<T>{
    statusCode: number,
    body: T
}

export interface HttpRequest<B>{
    params?: any,
    headers?: any,
    body?: any 
}

export interface IController {
    handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
}