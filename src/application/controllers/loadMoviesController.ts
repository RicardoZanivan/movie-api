import { ok, serverError } from "../helpers";

export class LoadMoviesController {
    constructor (private readonly loadMovies: any) {}

    async handle (request: LoadMoviesController.Request): Promise<any> {
        try {
            console.log('== movies req ==', request)
            const movies = await this.loadMovies.exec(request);

            return ok(movies)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace LoadMoviesController {
    export type Request = {
        page?: number
        size?: number
        winner?: boolean
        year?: number
    }
}