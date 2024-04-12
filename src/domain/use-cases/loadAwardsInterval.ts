import { MoviesSqliteRepository } from "@/infra/repos/sqlite3/movies";

export class LoadProductorsAwardsInterval {
    constructor (private readonly moviesSqliteRepository: MoviesSqliteRepository) {}

    async exec (): Promise<any> {
        return this.moviesSqliteRepository.loadMinMaxInterval();
    }
}