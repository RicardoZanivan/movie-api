import { LoadAwardsInterval } from "@/domain/contracts/repos";
import { HttpResponse, ok, serverError } from "../helpers";
import { Controller } from "./controller";

export class LoadProductorsAwardsIntervalController implements Controller {
    constructor (private readonly loadAwardsInterval: LoadAwardsInterval) {}

    async handle (): Promise<HttpResponse> {
        try {
            const movies = await this.loadAwardsInterval.exec();

            return ok(movies)
        } catch (error) {
            return serverError(error)
        }
    }
}