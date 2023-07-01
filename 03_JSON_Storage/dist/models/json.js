"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const JsonSchema = new mongoose_1.Schema({
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
        unique: true
    }
});
const Json = (0, mongoose_1.model)('Json', JsonSchema);
exports.default = Json;
