import * as express from 'express';
import * as http from 'http';
import ServiceProvider from "@ashuey/ludicolo-framework/lib/Support/ServiceProvider";
import {config} from "@ashuey/ludicolo-framework/lib/Support/helpers";

export default class HttpServiceProvider extends ServiceProvider {
    register() {
        this.app.singleton('http', ()  => {
            return express();
        });

        this.app.singleton('http.server', app => {
            return http.createServer(app);
        }, 'http');
    }

    async boot(): Promise<void> {
        const server = this.app.make('http.server');
        server.listen(config('http.port', 80));
        const addr = server.address();
        console.log(`Listening on port ${addr.port}`);
    }
}