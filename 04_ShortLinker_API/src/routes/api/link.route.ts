import {Router} from "express";
import linkController from "../../controllers/link.controller";

const LinkRouter: Router = Router();

LinkRouter.post('/create',  linkController.createLink);
LinkRouter.get('/:link', linkController.getLink);

export default LinkRouter;
