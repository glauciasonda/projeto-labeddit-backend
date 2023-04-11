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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const NotFoundError_1 = require("../Errors/NotFoundError");
const BadRequestError_1 = require("../Errors/BadRequestError");
class UserBusiness {
    constructor(userDTO, userDataBase, idGenerator, hashManager, tokenManager) {
        this.userDTO = userDTO;
        this.userDataBase = userDataBase;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.tokenManager = tokenManager;
        this.signUp = (input) => __awaiter(this, void 0, void 0, function* () {
            const userId = this.idGenerator.generate();
            const hashedPassword = yield this.hashManager.hash(input.password);
            const user = this.userDTO.toUserModel(input, userId, hashedPassword);
            yield this.userDataBase.signUp(user);
            const tokenPayload = {
                userId: user.getUserId(),
                name: user.getName(),
                role: user.getRole()
            };
            const token = this.tokenManager.createToken(tokenPayload);
            const outputToken = {
                message: "User created!!",
                token: token
            };
            return outputToken;
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const userLogin = yield this.userDataBase.getUserByEmail(input.email);
            if (!userLogin) {
                throw new NotFoundError_1.NotFoundError("User not found");
            }
            const passwordHash = yield this.hashManager.compare(input.password, userLogin.getPassword());
            if (!passwordHash) {
                throw new BadRequestError_1.BadRequestError("email or password incorrect");
            }
            const tokenPayload = {
                userId: userLogin.getUserId(),
                name: userLogin.getName(),
                role: userLogin.getRole()
            };
            const token = this.tokenManager.createToken(tokenPayload);
            const outputToken = {
                message: "User Ok!!",
                token: token
            };
            return outputToken;
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map