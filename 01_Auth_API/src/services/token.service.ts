import {UserDTO} from "../dtos/userDTO";
import jwt from 'jsonwebtoken'
import pool from "../config/db";


class TokenService {
    async generateTokens(dto: UserDTO) {
        const accessToken = jwt.sign(dto, String(process.env.JWT_ACCESS_SECRET), { expiresIn: String(process.env.TTL) });
        const refreshToken = jwt.sign(dto, String(process.env.JWT_REFRESH_SECRET));
        return {
            accessToken,
            refreshToken
        }
    }

    async saveTokens(userId: number, refreshToken: string ) {
        const tokenData = await pool.query('SELECT * FROM JWT_tokens WHERE user_id = $1', [userId]);
        if(tokenData.rows.length > 0) {
            const tokenUpdated = await pool.query('UPDATE JWT_tokens SET refresh_token = $1 WHERE user_id = $2', [refreshToken, userId]);
            return tokenUpdated;
        }
        const token = await pool.query('INSERT INTO JWT_tokens (refresh_token, user_id) VALUES ($1, $2) RETURNING *', [refreshToken, userId]);
        return token;
    }

    async validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, String(process.env.JWT_ACCESS_SECRET));
            return userData;
        } catch (err) {
            return null;
        }
    }

    async validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, String(process.env.JWT_REFRESH_SECRET));
            return userData;
        } catch (err) {
            return null;
        }
    }
}

const tokenService = new TokenService();
export default tokenService;
