import { MoviesSqliteRepository } from "@/infra/repos/sqlite3/movies";

type Setup = (
    moviesSqliteRepository: MoviesSqliteRepository
) => TopYearsAwards;

type Output = { year: number, winnerCount: number };
export type TopYearsAwards = () => Promise<Output>

export const setupTopYearsAwards: Setup = (moviesSqliteRepository) => async () => {
    return await moviesSqliteRepository.loadTopYearsAwards();
}