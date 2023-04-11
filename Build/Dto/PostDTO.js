"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDTO = void 0;
const BadRequestError_1 = require("../Errors/BadRequestError");
class PostDTO {
    createPostOutPutDTO(post) {
        const userCreator = {
            creatorId: post.getCreatorId(),
            name: post.getNameCreator(),
            email: post.getEmailCreator()
        };
        const dto = {
            id: post.getPostId(),
            content: post.getContent(),
            likes: post.getLikes(),
            deslikes: post.getDislikes(),
            comments: post.getComments(),
            createdAt: post.getPostCreatedAt(),
            updatedAt: post.getPostUpdatedAt(),
            creator: userCreator
        };
        return dto;
    }
    createPostInputDTO(content, token) {
        if (typeof content !== "string") {
            throw new BadRequestError_1.BadRequestError("content deve ser string");
        }
        if (typeof token !== "string") {
            throw new BadRequestError_1.BadRequestError("Token Null");
        }
        const dto = {
            content: content,
            token: token
        };
        return dto;
    }
    createPostCommentInputDTO(postOriginalId, content, token) {
        if (typeof postOriginalId !== "string") {
            throw new BadRequestError_1.BadRequestError("content deve ser string");
        }
        if (typeof content !== "string") {
            throw new BadRequestError_1.BadRequestError("content deve ser string");
        }
        if (typeof token !== "string") {
            throw new BadRequestError_1.BadRequestError("Token Null");
        }
        const dto = {
            postOriginalId,
            content,
            token
        };
        return dto;
    }
    createPostCommentGetDTO(postOriginalId, token) {
        if (typeof postOriginalId !== "string") {
            throw new BadRequestError_1.BadRequestError("content deve ser string");
        }
        if (typeof token !== "string") {
            throw new BadRequestError_1.BadRequestError("Token Null");
        }
        const dto = {
            postOriginalId,
            token
        };
        return dto;
    }
    createPostCommentOutputDTO(post, listComent) {
        const userCreator = {
            creatorId: post.getCreatorId(),
            name: post.getNameCreator(),
            email: post.getEmailCreator()
        };
        let allComments = listComent.map((element) => {
            return {
                user_id: element.getCreatorId(),
                user_name: element.getNameCreator(),
                content: element.getContent(),
                like: element.getLikes(),
                dislike: element.getDislikes()
            };
        });
        const dto = {
            id: post.getPostId(),
            content: post.getContent(),
            likes: post.getLikes(),
            deslikes: post.getDislikes(),
            comments: post.getComments(),
            createdAt: post.getPostCreatedAt(),
            updatedAt: post.getPostUpdatedAt(),
            creator: userCreator,
            listComments: allComments
        };
        return dto;
    }
}
exports.PostDTO = PostDTO;
//# sourceMappingURL=PostDTO.js.map