"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    static NotFound(message) {
        return new ApiError(404, message);
    }
    static Conflict(message) {
        return new ApiError(409, message);
    }
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.default = ApiError;
