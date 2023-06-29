import {Router} from "express";
import locationController from "../../controllers/location.controller";

const locationRouter: Router = Router();

locationRouter.get('', locationController.getUserInfo);

export default locationRouter;
