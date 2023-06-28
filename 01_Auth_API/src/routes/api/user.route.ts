import {Router} from "express";
import userController from "../../controllers/user.controller";
import {authMiddleware} from "../../middlewares/auth.middleware";

const userRouter: Router = Router();

userRouter.get('', authMiddleware, userController.getUserInfo);

export default userRouter;
