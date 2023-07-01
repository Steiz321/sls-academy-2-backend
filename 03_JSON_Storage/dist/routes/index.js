"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_route_1 = __importDefault(require("./api/json.route"));
class AppRouter {
    constructor(app) {
        this.app = app;
    }
    init() {
        this.app.get('/', (req, res) => {
            res.status(200).json('API running...');
        });
        this.app.use('/', json_route_1.default);
    }
}
exports.default = AppRouter;
