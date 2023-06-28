import ApiError from "../extensions/api.error";
import tokenService from "../services/token.service";
import {NextFunction, Request, Response} from "express";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return next(ApiError.NotFound('User is not authorized'))
        }

        const accessToken = authHeader.split(' ')[1];
        if(!accessToken) {
            return next(ApiError.NotFound('User is not authorized'))
        }

        const userData = await tokenService.validateAccessToken(accessToken);
        if(!userData) {
            return next(ApiError.NotFound('User is not authorized'))
        }

        req.user = userData;
        next();

    } catch (err) {
        return next(ApiError.NotFound('User not found'));
    }
}
