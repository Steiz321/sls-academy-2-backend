"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkValidationSchema = void 0;
const express_validator_1 = require("express-validator");
exports.linkValidationSchema = [
    (0, express_validator_1.body)('link').isURL(),
];
