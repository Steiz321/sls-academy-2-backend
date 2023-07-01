import {Application, Request, Response} from "express";
import LinkRouter from "./api/link.route";


class AppRouter {
    constructor(private app: Application) {}

    init() {
        this.app.get('/', (req, res) => {
            res.status(200).json('API running...')
        });
        this.app.use('/', LinkRouter);
    }
}

export default AppRouter;
