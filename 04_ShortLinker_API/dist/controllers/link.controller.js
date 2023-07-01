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
const link_service_1 = __importDefault(require("../services/link.service"));
class LinkController {
    createLink(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqLink = req.protocol + '://' + req.get('host');
                const { link } = req.body;
                const createdLink = yield link_service_1.default.createLink(link, reqLink);
                return res.status(200).json({ createdLink });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getLink(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
                const originalLink = yield link_service_1.default.getLink(fullUrl);
                res.status(300).redirect(originalLink);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
const linkController = new LinkController();
exports.default = linkController;
