import { MinMaxIntervalAwards } from "@/domain/use-cases";
import { HttpResponse, ok, serverError } from "../helpers";
import { Controller } from "./controller";

export class LoadProductorsAwardsIntervalController implements Controller {
    constructor (private readonly minMaxIntervalAwards: MinMaxIntervalAwards) {}

    async handle (): Promise<HttpResponse> {
        try {
            const intervals = await this.minMaxIntervalAwards();

            return ok(intervals)
        } catch (error) {
            return serverError(error)
        }
    }
}