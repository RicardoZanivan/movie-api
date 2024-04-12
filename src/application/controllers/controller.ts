import { HttpResponse } from "../helpers";

export interface Controller<T = any> {
    handle: (request: T) => Promise<HttpResponse>
}