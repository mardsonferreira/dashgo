import { createServer, Factory, Model } from "miragejs";
import faker, { date } from "faker";

import { User } from "./types";

export function makeServer() {
    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({}),
        },

        factories: {
            user: Factory.extend({
                name(index: number) {
                    return `User ${index + 1}`;
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
                createdAt() {
                    return faker.date.recent(10)
                },
            }),
        },

        seeds(server) {
            server.createList("user", 10);
        },

        routes() {
            this.namespace = "api";
            this.timing = 750;

            this.get("/users");
            this.post("/users");

            this.namespace = "";
            this.passthrough();
        },
    });

    return server;
}
