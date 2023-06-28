import bcrypt from 'bcrypt';
import pool from "../config/db";
import {UserDTO} from "../dtos/userDTO";
import tokenService from "./token.service";
import ApiError from "../extensions/api.error";

class AuthService {

    async signUp(email: string, password: string) {
        const newUser = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if(newUser.rows.length > 0) {
            throw ApiError.Conflict(`User with address: ${email} is already exists!`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashPassword]);

        const userDTO = new UserDTO(user.rows[0]);
        const tokens = await tokenService.generateTokens({...userDTO});
        await tokenService.saveTokens(userDTO.id, tokens.refreshToken);
        return {...tokens, user: userDTO};
    }

    async signIn(email: string, password: string) {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(user.rows.length < 1) {
            throw ApiError.NotFound('Invalid email or password!');
        }

        const isPasswordsEqual = await bcrypt.compare(password, user.rows[0].password);
        if(!isPasswordsEqual) {
            throw ApiError.NotFound('Invalid email or password!');
        }

        const userDTO = new UserDTO(user.rows[0]);
        const tokens = await tokenService.generateTokens({...userDTO});
        await tokenService.saveTokens(userDTO.id, tokens.refreshToken);
        return {...tokens, user: userDTO};
    }

    async refresh(refreshToken: string) {
        if(!refreshToken) {
            throw ApiError.NotFound('Refresh not found');
        }

        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await pool.query('SELECT * FROM JWT_tokens WHERE refresh_token = $1', [refreshToken]);

        if(tokenFromDb.rows.length < 0 || !userData) {
            throw ApiError.NotFound('invalid token');
        }

        const user = await pool.query('SELECT * FROM users WHERE id = $1', [userData.id]);
        return user;
    }


}

const authService = new AuthService();
export default authService;
