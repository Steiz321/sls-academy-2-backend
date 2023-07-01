"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const api_error_1 = __importDefault(require("../extensions/api.error"));
function validationMiddleware(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(api_error_1.default.BadRequest('Incoming data in not URL!'));
    }
    next();
}
exports.validationMiddleware = validationMiddleware;
