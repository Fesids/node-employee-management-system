

export interface HttpResponse<T>{
    statusCode: number,
    body: T
}

export interface HttpResponseLogin<T>{
    statusCode: number,
    body:T,
    token?: string
}

export interface HttpRequest<B>{
    params?: any,
    headers?: any,
    body?: any 
}

export interface IController {
    handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
}

export interface IControllerLogin{
    handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponseLogin<unknown>>
}