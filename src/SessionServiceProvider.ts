import * as session from 'express-session';
import {Express, RequestHandler} from "express";
import ServiceProvider from "@ashuey/ludicolo-framework/lib/Support/ServiceProvider";

export default class SessionServiceProvider extends ServiceProvider {
    register(): void {
        this.app.singleton('session', config => {
            return session({
                secret: config.get('app.key'),
                resave: false,
                saveUninitialized: false
            });
        }, 'config')
    }

    async boot(): Promise<void> {
        const session = this.app.make<RequestHandler>('session');
        const express = this.app.make<Express>('http');
        express.use(session);
    }
}