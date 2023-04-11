"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostController_1 = require("../Controller/PostController");
const PostDTO_1 = require("../Dto/PostDTO");
const PostDataBase_1 = require("../Database/PostDataBase");
const PostBusiness_1 = require("../Business/PostBusiness");
const IdGenerator_1 = require("../Services/IdGenerator");
const TokenManager_1 = require("../Services/TokenManager");
const LikeDTO_1 = require("../Dto/LikeDTO");
exports.postRouter = express_1.default.Router();
const postController = new PostController_1.PostController(new PostDTO_1.PostDTO(), new LikeDTO_1.LikeDTO(), new PostBusiness_1.PostBusiness(new PostDTO_1.PostDTO(), new PostDataBase_1.PostDatabase(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager()));
exports.postRouter.get("/", postController.getPosts);
exports.postRouter.post("/", postController.createPost);
exports.postRouter.post("/:id/comment", postController.createPostComment);
exports.postRouter.get("/:id/comment", postController.getPostWithComments);
exports.postRouter.put("/:id/like", postController.like);
exports.postRouter.delete("/:id", postController.deletePost);
//# sourceMappingURL=PostRouter.js.map