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
exports.PostBusiness = void 0;
const BadRequestError_1 = require("../Errors/BadRequestError");
const Post_1 = require("../Models/Post");
const Like_1 = require("../Models/Like");
const Types_1 = require("../Types");
class PostBusiness {
    constructor(postDTO, postDataBase, idGenerator, tokenManage) {
        this.postDTO = postDTO;
        this.postDataBase = postDataBase;
        this.idGenerator = idGenerator;
        this.tokenManage = tokenManage;
        this.getPosts = (input) => __awaiter(this, void 0, void 0, function* () {
            const allPosts = yield this.postDataBase.getPosts(input);
            const output = allPosts.map((post) => {
                return this.postDTO.createPostOutPutDTO(post);
            });
            return (output);
        });
        this.getPostWithComments = (input) => __awaiter(this, void 0, void 0, function* () {
            const { postOriginalId, token } = input;
            const payload = this.tokenManage.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("Invalid Token");
            }
            const [postOriginal] = yield this.postDataBase.getPosts(postOriginalId);
            if (!postOriginal) {
                throw new BadRequestError_1.BadRequestError("Invalid postId");
            }
            const comments = yield this.postDataBase.getComments(postOriginalId);
            const output = this.postDTO.createPostCommentOutputDTO(postOriginal, comments);
            return output;
        });
        this.createPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { content, token } = input;
            const payload = this.tokenManage.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("Invalid Token");
            }
            const postId = this.idGenerator.generate();
            const newPost = new Post_1.Post(postId, payload.userId, null, null, content, 0, 0, new Date().toISOString(), new Date().toISOString(), postId, 0, Types_1.TYPE_POST.POST);
            yield this.postDataBase.createPost(newPost);
        });
        this.createPostComment = (input) => __awaiter(this, void 0, void 0, function* () {
            const { postOriginalId, content, token } = input;
            const payload = this.tokenManage.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("Invalid Token");
            }
            const [postOriginal] = yield this.postDataBase.getPosts(postOriginalId);
            if (!postOriginal) {
                throw new BadRequestError_1.BadRequestError("Invalid postId");
            }
            const postCommentId = this.idGenerator.generate();
            const postComment = new Post_1.Post(postCommentId, payload.userId, null, null, content, 0, 0, new Date().toISOString(), new Date().toISOString(), postOriginalId, 0, Types_1.TYPE_POST.COMMENT);
            yield this.postDataBase.createPost(postComment);
            const comments = postOriginal.getComments();
            postOriginal.setComments(comments + 1);
            yield this.postDataBase.updatePost(postOriginal);
        });
        this.likeDislke = (input) => __awaiter(this, void 0, void 0, function* () {
            const { like, token, postId } = input;
            const valueLike = like ? 1 : 0;
            const payload = this.tokenManage.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("Invalid Token");
            }
            const [post] = yield this.postDataBase.getPosts(postId);
            if (!post) {
                throw new BadRequestError_1.BadRequestError("Invalid postId");
            }
            if (post.getCreatorId() === payload.userId) {
                throw new BadRequestError_1.BadRequestError("user don't able to Like/Dislike");
            }
            const likeTotal = post.getLikes();
            const dislikeTotal = post.getDislikes();
            const postLike = yield this.postDataBase.getLike(post.getPostId(), post.getCreatorId());
            if (postLike) {
                if (postLike.getLike() === valueLike) {
                    yield this.postDataBase.delteLike(postLike.getPostId());
                    if (like) {
                        post.setLikes(likeTotal - 1);
                    }
                    else {
                        post.setDislikes(dislikeTotal - 1);
                    }
                    yield this.postDataBase.updatePost(post);
                }
                else {
                    console.log("entrou no else");
                    postLike.setLike(valueLike);
                    yield this.postDataBase.updateLike(postLike);
                    if (like) {
                        post.setLikes(likeTotal + 1);
                        post.setDislikes(dislikeTotal - 1);
                    }
                    else {
                        post.setLikes(likeTotal - 1);
                        post.setDislikes(dislikeTotal + 1);
                    }
                    yield this.postDataBase.updatePost(post);
                }
            }
            else {
                const newLike = new Like_1.Like(post.getCreatorId(), post.getPostId(), valueLike);
                yield this.postDataBase.createLike(newLike);
                if (like) {
                    post.setLikes(likeTotal + 1);
                }
                else {
                    post.setDislikes(dislikeTotal + 1);
                }
                yield this.postDataBase.updatePost(post);
            }
        });
        this.deletePost = (postId, token) => __awaiter(this, void 0, void 0, function* () {
            const payload = this.tokenManage.getPayload(token);
            if (!payload) {
                throw new BadRequestError_1.BadRequestError("Invalid Token");
            }
            const [post] = yield this.postDataBase.getPosts(postId);
            if (!post) {
                throw new BadRequestError_1.BadRequestError("Invalid postId");
            }
            if ((post.getCreatorId() === payload.userId) || (payload.role === Types_1.USER_ROLES.NORMAL)) {
                yield this.postDataBase.deletePost(postId);
            }
            else {
                throw new BadRequestError_1.BadRequestError("user not allowed");
            }
        });
    }
}
exports.PostBusiness = PostBusiness;
//# sourceMappingURL=PostBusiness.js.map