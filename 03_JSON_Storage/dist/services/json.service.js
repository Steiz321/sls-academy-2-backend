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
const file_service_1 = __importDefault(require("./file.service"));
const bucket_1 = __importDefault(require("../models/bucket"));
const json_1 = __importDefault(require("../models/json"));
const api_error_1 = __importDefault(require("../extensions/api.error"));
class JsonService {
    putJson(bucketName, jsonName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringData = JSON.stringify(data, null, 2);
            const jsonPath = yield file_service_1.default.createJson(bucketName, jsonName, stringData);
            let existingBucket = yield bucket_1.default.findOne({ bucketName });
            if (!existingBucket) {
                existingBucket = yield bucket_1.default.create({ bucketName, jsons: [] });
            }
            let jsonFile = yield json_1.default.findOneAndUpdate({ fileName: jsonName, filePath: jsonPath }, { fileName: jsonName, filePath: jsonPath });
            if (!jsonFile) {
                jsonFile = yield json_1.default.create({ fileName: jsonName, filePath: jsonPath });
            }
            if (!existingBucket.jsons.includes(jsonFile._id)) {
                yield existingBucket.jsons.push(jsonFile._id);
                yield existingBucket.save();
            }
            return data;
        });
    }
    getJson(bucketName, jsonName) {
        return __awaiter(this, void 0, void 0, function* () {
            const bucket = yield bucket_1.default.findOne({ bucketName });
            if (!bucket) {
                throw api_error_1.default.BadRequest('invalid bucket or file name');
            }
            const json = yield json_1.default.findOne({ fileName: jsonName }).where('_id').in(bucket.jsons).exec();
            if (!json) {
                throw api_error_1.default.BadRequest('invalid bucket or file name');
            }
            const jsonData = yield file_service_1.default.getJsonData(json.filePath);
            return jsonData;
        });
    }
}
const jsonService = new JsonService();
exports.default = jsonService;
