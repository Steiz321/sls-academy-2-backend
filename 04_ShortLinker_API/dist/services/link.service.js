"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const link_1 = __importDefault(require("../models/link"));
const api_error_1 = __importDefault(require("../extensions/api.error"));
class LinkService {
    createLink(link, reqLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const randomString = crypto_1.default.randomBytes(4).toString('hex');
            const shortedLink = reqLink + '/' + randomString;
            const existsLink = yield link_1.default.findOne({ originalUrl: link });
            if (existsLink) {
                return existsLink;
            }
            const createdLink = yield link_1.default.create({ originalUrl: link, shortedUrl: shortedLink });
            return createdLink;
        });
    }
    getLink(fullLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const linkObj = yield link_1.default.findOne({ shortedUrl: fullLink });
            if (!linkObj) {
                throw api_error_1.default.BadRequest('Unknown url!');
            }
            const originalUrl = linkObj.originalUrl;
            return originalUrl;
        });
    }
}
const linkService = new LinkService();
exports.default = linkService;
