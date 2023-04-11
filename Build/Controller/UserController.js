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
exports.UserController = void 0;
const BaseError_1 = require("../Errors/BaseError");
class UserController {
    constructor(userDTO, userBusiness) {
        this.userDTO = userDTO;
        this.userBusiness = userBusiness;
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = this.userDTO.createUserInputDTO(req.body.name, req.body.email, req.body.password);
                const outputToken = yield this.userBusiness.signUp(input);
                res.status(201).send(outputToken);
            }
            catch (error) {
                console.log("Erro ao executar UserController.signUp", error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            try {
                const userLoginDTO = this.userDTO.createUserLoginDTO(email, password);
                const outputToken = yield this.userBusiness.login(userLoginDTO);
                res.status(200).send(outputToken);
            }
            catch (error) {
                console.log("Erro ao executar método UserController.login", error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map