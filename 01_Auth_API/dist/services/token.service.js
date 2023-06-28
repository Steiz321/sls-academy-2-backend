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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
class TokenService {
    generateTokens(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = jsonwebtoken_1.default.sign(dto, String(process.env.JWT_ACCESS_SECRET), { expiresIn: String(process.env.TTL) });
            const refreshToken = jsonwebtoken_1.default.sign(dto, String(process.env.JWT_REFRESH_SECRET));
            return {
                accessToken,
                refreshToken
            };
        });
    }
    saveTokens(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield db_1.default.query('SELECT * FROM JWT_tokens WHERE user_id = $1', [userId]);
            if (tokenData.rows.length > 0) {
                const tokenUpdated = yield db_1.default.query('UPDATE JWT_tokens SET refresh_token = $1 WHERE user_id = $2', [refreshToken, userId]);
                return tokenUpdated;
            }
            const token = yield db_1.default.query('INSERT INTO JWT_tokens (refresh_token, user_id) VALUES ($1, $2) RETURNING *', [refreshToken, userId]);
            return token;
        });
    }
    validateAccessToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = jsonwebtoken_1.default.verify(token, String(process.env.JWT_ACCESS_SECRET));
                return userData;
            }
            catch (err) {
                return null;
            }
        });
    }
    validateRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = jsonwebtoken_1.default.verify(token, String(process.env.JWT_REFRESH_SECRET));
                return userData;
            }
            catch (err) {
                return null;
            }
        });
    }
}
const tokenService = new TokenService();
exports.default = tokenService;
