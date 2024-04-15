import { TopYearsAwards } from "@/domain/use-cases";
import { HttpResponse, ok, serverError } from "../helpers";
import { Controller } from "./controller";

export class LoadTopYearsAwardsController implements Controller {
    constructor (private readonly topYearsAwards: TopYearsAwards) {}

    async handle (): Promise<HttpResponse> {
        try {
            const years = await this.topYearsAwards();

            return ok(years)
        } catch (error) {
            return serverError(error)
        }
    }
}