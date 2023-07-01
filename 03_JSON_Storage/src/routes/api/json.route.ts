import {Router} from "express";
import JsonController from "../../controllers/json.controller";

const JsonRouter: Router = Router();

JsonRouter.put('/:bucketName/:jsonName', JsonController.putJSONFile);
JsonRouter.get('/:bucketName/:jsonName', JsonController.getJSONFile);

export default JsonRouter;
