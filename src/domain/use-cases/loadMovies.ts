import { MoviesSqliteRepository } from "@/infra/repos/sqlite3/movies";

export class LoadMovies {
    constructor (private readonly moviesSqliteRepository: MoviesSqliteRepository) {}

    async exec (input: any): Promise<any> {
        return this.moviesSqliteRepository.loadAll(input);
    }
}