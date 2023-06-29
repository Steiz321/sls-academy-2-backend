"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const api_error_1 = __importDefault(require("../extensions/api.error"));
const fs = __importStar(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
class LocationService {
    ConvertIpToDecimal(ip) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ip) {
                throw api_error_1.default.BadRequest('ip error');
            }
            let arr;
            if (typeof ip === "string") {
                arr = ip.split('.').map(el => Number(el));
            }
            else {
                arr = ip[0].split('.').map(el => Number(el));
            }
            const decimalIp = arr[0] * Math.pow(256, 3) + arr[1] * Math.pow(256, 2) + arr[2] * 256 + arr[3] * 1;
            return decimalIp;
        });
    }
    readCSVData() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = [];
            yield new Promise((resolve, reject) => {
                fs.createReadStream('./dist/files/IP2LOCATION-LITE-DB1.csv')
                    .pipe((0, csv_parser_1.default)(['lower', 'upper', 'symbol', 'country']))
                    .on('data', (data) => results.push(data))
                    .on('end', resolve)
                    .on('error', reject);
            });
            if (!results.length) {
                throw api_error_1.default.BadRequest('read file error');
            }
            return results;
        });
    }
    checkCountry(ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const decimalIp = yield this.ConvertIpToDecimal(ip);
            const data = yield this.readCSVData();
            for (let el of data) {
                if (Number(el.lower) <= decimalIp && Number(el.upper) >= decimalIp) {
                    return {
                        symbol: el.symbol,
                        country: el.country
                    };
                }
            }
            return null;
        });
    }
}
const locationService = new LocationService();
exports.default = locationService;
