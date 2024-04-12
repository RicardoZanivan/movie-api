export interface LoadAwardsInterval {
    exec: () => Promise<LoadAwardsInterval.Output>
}

export namespace LoadAwardsInterval {
    export type Output = undefined | {
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
    }
  }