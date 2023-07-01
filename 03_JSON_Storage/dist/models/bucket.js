"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bucketSchema = new mongoose_1.Schema({
    bucketName: {
        type: String,
        required: true,
        unique: true
    },
    jsons: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Json'
        }]
});
const Bucket = (0, mongoose_1.model)('Bucket', bucketSchema);
exports.default = Bucket;
