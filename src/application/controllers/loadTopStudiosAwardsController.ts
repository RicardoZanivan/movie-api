import { TopStudiosAwards } from "@/domain/use-cases";
import { HttpResponse, ok, serverError } from "../helpers";
import { Controller } from "./controller";

export class LoadTopStudiosAwardsController implements Controller {
    constructor (private readonly topStudiosAwards: TopStudiosAwards) {}

    async handle (): Promise<HttpResponse> {
        try {
            const studios = await this.topStudiosAwards();

            return ok(studios)
        } catch (error) {
            return serverError(error)
        }
    }
}