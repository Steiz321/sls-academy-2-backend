"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../../controllers/auth.controller"));
const validation_shemas_1 = require("../../extensions/validation.shemas");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const authRouter = (0, express_1.Router)();
authRouter.post('/sign-up', validation_shemas_1.signValidationSchema, validation_middleware_1.validationMiddleware, auth_controller_1.default.signUp);
authRouter.post('/sign-in', validation_shemas_1.signValidationSchema, validation_middleware_1.validationMiddleware, auth_controller_1.default.signIn);
authRouter.get('/refresh', auth_controller_1.default.refresh);
exports.default = authRouter;
