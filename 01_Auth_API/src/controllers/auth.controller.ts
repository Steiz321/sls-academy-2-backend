import {NextFunction, Request, Response} from "express";
import authService from "../services/auth.service";


class AuthController {
    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const user = await authService.signUp(email, password)
            res.cookie('refreshToken', user.refreshToken ,{ maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.status(201).json({
                success: true,
                data: {
                    id: user.user.id,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken
                }
            })
        } catch (err) {
            next(err);
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const user = await authService.signIn(email, password);
            res.cookie('refreshToken', user.refreshToken ,{ maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.status(200).json({
                success: true,
                data: {
                    id: user.user.id,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken
                }
            });
        } catch (err) {
            next(err);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await authService.refresh(refreshToken);
            console.log('userData', userData);
            return res.status(200).json(userData);
        } catch (err) {
            next(err);
        }
    }
}

const authController = new AuthController();
export default authController;
