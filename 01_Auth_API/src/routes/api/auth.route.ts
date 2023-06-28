import {Router} from "express";
import authController from "../../controllers/auth.controller";
import {signValidationSchema} from "../../extensions/validation.shemas";
import {validationMiddleware} from "../../middlewares/validation.middleware";

const authRouter: Router = Router();

authRouter.post('/sign-up', signValidationSchema, validationMiddleware, authController.signUp);
authRouter.post('/sign-in', signValidationSchema, validationMiddleware,authController.signIn);
authRouter.get('/refresh', authController.refresh);

export default authRouter
