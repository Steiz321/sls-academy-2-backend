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
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../config/db"));
const userDTO_1 = require("../dtos/userDTO");
const token_service_1 = __importDefault(require("./token.service"));
const api_error_1 = __importDefault(require("../extensions/api.error"));
class AuthService {
    signUp(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield db_1.default.query('SELECT * FROM users WHERE email = $1', [email]);
            if (newUser.rows.length > 0) {
                throw api_error_1.default.Conflict(`User with address: ${email} is already exists!`);
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 3);
            const user = yield db_1.default.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashPassword]);
            const userDTO = new userDTO_1.UserDTO(user.rows[0]);
            const tokens = yield token_service_1.default.generateTokens(Object.assign({}, userDTO));
            yield token_service_1.default.saveTokens(userDTO.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDTO });
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.default.query('SELECT * FROM users WHERE email = $1', [email]);
            if (user.rows.length < 1) {
                throw api_error_1.default.NotFound('Invalid email or password!');
            }
            const isPasswordsEqual = yield bcrypt_1.default.compare(password, user.rows[0].password);
            if (!isPasswordsEqual) {
                throw api_error_1.default.NotFound('Invalid email or password!');
            }
            const userDTO = new userDTO_1.UserDTO(user.rows[0]);
            const tokens = yield token_service_1.default.generateTokens(Object.assign({}, userDTO));
            yield token_service_1.default.saveTokens(userDTO.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDTO });
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_error_1.default.NotFound('Refresh not found');
            }
            const userData = yield token_service_1.default.validateRefreshToken(refreshToken);
            const tokenFromDb = yield db_1.default.query('SELECT * FROM JWT_tokens WHERE refresh_token = $1', [refreshToken]);
            if (tokenFromDb.rows.length < 0 || !userData) {
                throw api_error_1.default.NotFound('invalid token');
            }
            const user = yield db_1.default.query('SELECT * FROM users WHERE id = $1', [userData.id]);
            return user;
        });
    }
}
const authService = new AuthService();
exports.default = authService;
