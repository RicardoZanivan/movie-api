import { MoviesSqliteRepository } from "@/infra/repos/sqlite3/movies";

type Setup = (
    moviesSqliteRepository: MoviesSqliteRepository
) => TopStudiosAwards;

type Output = { studio_name: string, winCount: number }[];
export type TopStudiosAwards = () => Promise<Output>

export const setupTopStudiosAwards: Setup = (moviesSqliteRepository) => async () => {
    return await moviesSqliteRepository.loadTopStudios();
}