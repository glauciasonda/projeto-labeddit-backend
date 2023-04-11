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
exports.PostController = void 0;
const BaseError_1 = require("../Errors/BaseError");
class PostController {
    constructor(postDTO, likeDTO, postBusiness) {
        this.postDTO = postDTO;
        this.likeDTO = likeDTO;
        this.postBusiness = postBusiness;
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = req.body.query;
                const output = yield this.postBusiness.getPosts(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log("Erro ao executar método PostController.getPosts", error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.getPostWithComments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const postOriginalId = req.params.id;
                const token = req.headers.authorization;
                const input = this.postDTO.createPostCommentGetDTO(postOriginalId, token);
                const output = yield this.postBusiness.getPostWithComments(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log("Erro ao executar método PostController.getPostWithComments", error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const content = req.body.content;
                const token = req.headers.authorization;
                const input = this.postDTO.createPostInputDTO(content, token);
                yield this.postBusiness.createPost(input);
                res.status(201).send();
            }
            catch (error) {
                console.log("Erro ao executar método PostController.createPost", error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.createPostComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const postOriginalId = req.params.id;
                const content = req.body.content;
                const token = req.headers.authorization;
                const input = this.postDTO.createPostCommentInputDTO(postOriginalId, content, token);
                yield this.postBusiness.createPostComment(input);
                res.status(201).send();
            }
            catch (error) {
                console.log("Erro ao executar método PostController.createPostComment", error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.like = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const like = req.body.like;
                const token = req.headers.authorization;
                const postId = req.params.id;
                const input = this.likeDTO.createLikeInputDTO(like, token, postId);
                yield this.postBusiness.likeDislke(input);
                res.status(200).send();
            }
            catch (error) {
                console.log("Erro ao executar método PostController.like", error);
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                }
            }
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const postId = req.params.id;
                yield this.postBusiness.deletePost(postId, token);
            }
            catch (error) {
                console.log("Erro ao executar método PostController.deletePost", error);
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
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map