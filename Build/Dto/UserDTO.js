"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
const BadRequestError_1 = require("../Errors/BadRequestError");
const User_1 = require("../Models/User");
const Types_1 = require("../Types");
class UserDTO {
    createUserInputDTO(name, email, password) {
        if (typeof name !== "string") {
            throw new BadRequestError_1.BadRequestError("name deve ser string");
        }
        if (typeof email !== "string") {
            throw new BadRequestError_1.BadRequestError("email deve ser string");
        }
        if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i)) {
            throw new BadRequestError_1.BadRequestError("email inválido");
        }
        if (typeof password !== "string") {
            throw new BadRequestError_1.BadRequestError("password deve ser string");
        }
        const dto = {
            name,
            email,
            password
        };
        return dto;
    }
    createUserLoginDTO(email, password) {
        if (typeof email !== "string") {
            throw new BadRequestError_1.BadRequestError("email deve ser string");
        }
        if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i)) {
            throw new BadRequestError_1.BadRequestError("email inválido");
        }
        if (typeof password !== "string") {
            throw new BadRequestError_1.BadRequestError("password deve ser string");
        }
        const dto = {
            email,
            password
        };
        return dto;
    }
    toUserModel(userInputDTO, userIdGenerator, passwordHash) {
        return new User_1.User(userIdGenerator, userInputDTO.name, userInputDTO.email, passwordHash, Types_1.USER_ROLES.NORMAL, new Date().toISOString());
    }
}
exports.UserDTO = UserDTO;
//# sourceMappingURL=UserDTO.js.map