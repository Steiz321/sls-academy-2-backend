import {Application, Request, Response} from "express";
import authRouter from "./api/auth.route";
import userRouter from "./api/user.route";


class AppRouter {
    constructor(private app: Application) {}

    init() {
        this.app.get('/', (_req: Request, res: Response) => {
            res.send('API running...');
        })
        this.app.use('/auth', authRouter);
        this.app.use('/me', userRouter);
    }
}

export default AppRouter;
