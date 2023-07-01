"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const json_controller_1 = __importDefault(require("../../controllers/json.controller"));
const JsonRouter = (0, express_1.Router)();
JsonRouter.put('/:bucketName/:jsonName', json_controller_1.default.putJSONFile);
JsonRouter.get('/:bucketName/:jsonName', json_controller_1.default.getJSONFile);
exports.default = JsonRouter;
