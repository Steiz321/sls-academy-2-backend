"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./api/auth.route"));
const user_route_1 = __importDefault(require("./api/user.route"));
class AppRouter {
    constructor(app) {
        this.app = app;
    }
    init() {
        this.app.get('/', (_req, res) => {
            res.send('API running...');
        });
        this.app.use('/auth', auth_route_1.default);
        this.app.use('/me', user_route_1.default);
    }
}
exports.default = AppRouter;
