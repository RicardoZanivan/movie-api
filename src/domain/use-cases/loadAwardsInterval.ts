import { MoviesSqliteRepository } from "@/infra/repos/sqlite3/movies";

type Setup = (
    moviesSqliteRepository: MoviesSqliteRepository
) => MinMaxIntervalAwards;

type Output = {
    min: [
        {
            producer: string,
            interval: number,
            previousWin: number,
            followingWin: number
        }[]
      ],
      max: [
        {
            producer: string,
            interval: number,
            previousWin: number,
            followingWin: number
        }[]
      ]
};

export type MinMaxIntervalAwards = () => Promise<Output>

export const setupMinMaxIntervalAwards: Setup = (moviesSqliteRepository) => async () => {
    return await moviesSqliteRepository.loadMinMaxInterval();
}