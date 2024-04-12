import { ok, serverError } from "../helpers";

export class LoadMoviesController {
    constructor (private readonly loadMovies: any) {}

    async handle (request: LoadMoviesController.Request): Promise<any> {
        try {
            let winner: boolean;
            if (request && request.winner !== undefined && request.winner !== null && request.winner !== '') {
                winner = (request.winner == 'true') ? true : false
            }
            const movies = await this.loadMovies.exec({
                ...request,
                winner
            });

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
        winner?: string
        year?: number
    }
}