"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield auth_service_1.default.signUp(email, password);
                res.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.status(201).json({
                    success: true,
                    data: {
                        id: user.user.id,
                        accessToken: user.accessToken,
                        refreshToken: user.refreshToken
                    }
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield auth_service_1.default.signIn(email, password);
                res.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.status(200).json({
                    success: true,
                    data: {
                        id: user.user.id,
                        accessToken: user.accessToken,
                        refreshToken: user.refreshToken
                    }
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield auth_service_1.default.refresh(refreshToken);
                console.log('userData', userData);
                return res.status(200).json(userData);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
const authController = new AuthController();
exports.default = authController;
