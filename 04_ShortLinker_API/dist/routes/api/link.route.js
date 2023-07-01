"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const link_controller_1 = __importDefault(require("../../controllers/link.controller"));
const LinkRouter = (0, express_1.Router)();
LinkRouter.post('/create', link_controller_1.default.createLink);
LinkRouter.get('/:link', link_controller_1.default.getLink);
exports.default = LinkRouter;
