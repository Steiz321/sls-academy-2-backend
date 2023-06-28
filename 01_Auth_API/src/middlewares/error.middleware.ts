import ApiError from '../extensions/api.error';
import {NextFunction, Request, Response} from "express";

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    if(err instanceof ApiError) {
        return res.status(err.status).json({
            success: false,
            error: err.message
        });
    }

    return res.status(500).json({message: 'Unexpected error happens!'});
}

export default errorMiddleware;
