import {NextFunction, Request, Response} from "express";
import locationService from "../services/location.service";
import ApiError from "../extensions/api.error";

class LocationController {
    async getUserInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const ip = req.headers['x-forwarded-for'] ||
                req.socket.remoteAddress ||
                req.ip ||
                null;

            const countryObj = await locationService.checkCountry(ip);

            if(!countryObj) {
                throw ApiError.BadRequest('invalid ip');
            }

            return res.status(200).send({
                    success: true,
                    data: {
                        countrySymbol: countryObj.symbol,
                        country: countryObj.country
                    }
            });
        } catch (err) {
            next(err);
        }
    }
}

const locationController = new LocationController();
export default locationController;
