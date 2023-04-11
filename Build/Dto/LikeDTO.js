"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeDTO = void 0;
const BadRequestError_1 = require("../Errors/BadRequestError");
class LikeDTO {
    createLikeInputDTO(like, token, postId) {
        if (typeof like !== "boolean") {
            throw new BadRequestError_1.BadRequestError("like deve ser bolean");
        }
        if (typeof token !== "string") {
            throw new BadRequestError_1.BadRequestError("token deve ser string");
        }
        if (typeof postId !== "string") {
            throw new BadRequestError_1.BadRequestError("postId deve ser string");
        }
        const dto = {
            like: like,
            token: token,
            postId: postId
        };
        return dto;
    }
}
exports.LikeDTO = LikeDTO;
//# sourceMappingURL=LikeDTO.js.map