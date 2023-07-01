import {Application, Request, Response} from "express";
import JsonRouter from "./api/json.route";


class AppRouter {
    constructor(private app: Application) {}

    init() {
        this.app.get('/', (req, res) => {
            res.status(200).json('API running...')
        });
        this.app.use('/', JsonRouter);
    }
}

export default AppRouter;
