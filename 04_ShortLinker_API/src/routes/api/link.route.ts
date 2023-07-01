import {Router} from "express";
import linkController from "../../controllers/link.controller";
import {validationMiddleware} from "../../middlewares/validation.middleware";
import {linkValidationSchema} from "../../extensions/validation.schemas";

const LinkRouter: Router = Router();

LinkRouter.post('/create', linkValidationSchema, validationMiddleware,  linkController.createLink);
LinkRouter.get('/:link', linkController.getLink);

export default LinkRouter;
