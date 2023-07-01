"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const linkSchema = new mongoose_1.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortedUrl: {
        type: String,
        required: true,
        unique: true
    }
});
const Link = (0, mongoose_1.model)('Link', linkSchema);
exports.default = Link;
