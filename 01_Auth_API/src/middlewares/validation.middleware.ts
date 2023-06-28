import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import ApiError from "../extensions/api.error";


export function validationMiddleware(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return next(ApiError.BadRequest('Incoming data validation error'));
    }

    next();
}
