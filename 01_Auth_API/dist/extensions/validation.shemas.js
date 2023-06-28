"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signValidationSchema = void 0;
const express_validator_1 = require("express-validator");
exports.signValidationSchema = [
    (0, express_validator_1.body)('email').exists({ checkFalsy: true }).isEmail(),
    (0, express_validator_1.body)('password').exists({ checkFalsy: true })
];
