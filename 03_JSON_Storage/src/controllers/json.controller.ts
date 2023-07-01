import {NextFunction, Request, Response} from "express";
import jsonService from '../services/json.service';


class JsonController {

    async putJSONFile(req: Request, res: Response, next: NextFunction) {
        try {
            const {bucketName, jsonName} = req.params;
            const data = req.body;

            const createdJson = await jsonService.putJson(bucketName, jsonName, data);

            res.status(200).json(createdJson);
        } catch (err) {
            next(err);
        }
    }

    async getJSONFile(req: Request, res: Response, next: NextFunction) {
        try {
            const {bucketName, jsonName} = req.params;

            const jsonData = await jsonService.getJson(bucketName, jsonName);

            res.status(200).json(jsonData)
        } catch (err) {
            next(err);
        }
    }

}

const jsonController = new JsonController();
export default jsonController;
