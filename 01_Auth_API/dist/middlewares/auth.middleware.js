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
exports.authMiddleware = void 0;
const api_error_1 = __importDefault(require("../extensions/api.error"));
const token_service_1 = __importDefault(require("../services/token.service"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(api_error_1.default.NotFound('User is not authorized'));
        }
        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return next(api_error_1.default.NotFound('User is not authorized'));
        }
        const userData = yield token_service_1.default.validateAccessToken(accessToken);
        if (!userData) {
            return next(api_error_1.default.NotFound('User is not authorized'));
        }
        req.user = userData;
        next();
    }
    catch (err) {
        return next(api_error_1.default.NotFound('User not found'));
    }
});
exports.authMiddleware = authMiddleware;
