"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserBusiness_1 = require("../Business/UserBusiness");
const UserController_1 = require("../Controller/UserController");
const UserDataBase_1 = require("../Database/UserDataBase");
const UserDTO_1 = require("../Dto/UserDTO");
const HashManager_1 = require("../Services/HashManager");
const IdGenerator_1 = require("../Services/IdGenerator");
const TokenManager_1 = require("../Services/TokenManager");
exports.userRouter = express_1.default.Router();
const userController = new UserController_1.UserController(new UserDTO_1.UserDTO(), new UserBusiness_1.UserBusiness(new UserDTO_1.UserDTO(), new UserDataBase_1.UserDataBase(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new TokenManager_1.TokenManager()));
exports.userRouter.post("/signup", userController.signUp);
exports.userRouter.post("/login", userController.login);
//# sourceMappingURL=UserRouter.js.map