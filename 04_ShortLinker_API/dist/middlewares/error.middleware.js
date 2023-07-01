"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../extensions/api.error"));
const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof api_error_1.default) {
        return res.status(err.status).json({
            success: false,
            error: err.message
        });
    }
    return res.status(500).json({ message: 'Unexpected error happens!' });
};
exports.default = errorMiddleware;
