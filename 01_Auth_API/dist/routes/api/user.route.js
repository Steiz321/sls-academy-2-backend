"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const userRouter = (0, express_1.Router)();
userRouter.get('', auth_middleware_1.authMiddleware, user_controller_1.default.getUserInfo);
exports.default = userRouter;
