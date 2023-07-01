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
const json_service_1 = __importDefault(require("../services/json.service"));
class JsonController {
    putJSONFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bucketName, jsonName } = req.params;
                const data = req.body;
                const createdJson = yield json_service_1.default.putJson(bucketName, jsonName, data);
                res.status(200).json(createdJson);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getJSONFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bucketName, jsonName } = req.params;
                const jsonData = yield json_service_1.default.getJson(bucketName, jsonName);
                res.status(200).json(jsonData);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
const jsonController = new JsonController();
exports.default = jsonController;
