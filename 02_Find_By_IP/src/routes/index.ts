import {Application, Request, Response} from "express";
import locationRouter from "./api/location.route";


class AppRouter {
    constructor(private app: Application) {}

    init() {
        this.app.use('/', locationRouter);
    }
}

export default AppRouter;
