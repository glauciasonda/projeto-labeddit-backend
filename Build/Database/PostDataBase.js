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
exports.PostDatabase = void 0;
const Types_1 = require("../Types");
const BaseDataBase_1 = require("./BaseDataBase");
const Post_1 = require("../Models/Post");
const Like_1 = require("../Models/Like");
class PostDatabase extends BaseDataBase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getComments = (q) => __awaiter(this, void 0, void 0, function* () {
            const typePost = Types_1.TYPE_POST.COMMENT;
            const result = yield BaseDataBase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .select("post_id as postId", "creator_id as creatorId", "content", "likes", "dislikes", "post_created_at as postCreatedAt", "post_update_at as postUpdateAt", "name", "email", "post_original_id as postOriginalId", "comments", "type_post as typePost")
                .innerJoin(PostDatabase.TABLE_USERS, "creator_id", "=", "user_id")
                .where("post_original_id", "=", `${q}`)
                .andWhere("type_post", "=", `${typePost}`);
            const allComments = result.map((item) => {
                return new Post_1.Post(item.postId, item.creatorId, item.name, item.email, item.content, item.likes, item.dislikes, item.postCreatedAt, item.postUpdateAt, item.postOriginalId, item.comments, item.typePost);
            });
            return allComments;
        });
        this.createPost = (post) => __awaiter(this, void 0, void 0, function* () {
            const postDB = {
                post_id: post.getPostId(),
                creator_id: post.getCreatorId(),
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes(),
                post_created_at: post.getPostCreatedAt(),
                post_update_at: post.getPostUpdatedAt(),
                post_original_id: post.getPostOriginalId(),
                comments: post.getComments(),
                type_post: post.getTypePost()
            };
            yield BaseDataBase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .insert(postDB);
        });
        this.getLike = (postId, userId) => __awaiter(this, void 0, void 0, function* () {
            let like;
            const [likeDB] = yield BaseDataBase_1.BaseDatabase
                .connection(PostDatabase.TABLE_LIKES)
                .where("post_id", "=", `${postId}`)
                .andWhere("user_id", "=", `${userId}`);
            if (likeDB) {
                like = new Like_1.Like(likeDB.user_id, likeDB.post_id, likeDB.like);
            }
            return like;
        });
        this.createLike = (like) => __awaiter(this, void 0, void 0, function* () {
            const likeDB = {
                user_id: like.getUserId(),
                post_id: like.getPostId(),
                like: like.getLike()
            };
            yield BaseDataBase_1.BaseDatabase
                .connection(PostDatabase.TABLE_LIKES)
                .insert(likeDB);
        });
        this.updateLike = (like) => __awaiter(this, void 0, void 0, function* () {
            const likeDB = {
                user_id: like.getUserId(),
                post_id: like.getPostId(),
                like: like.getLike()
            };
            yield BaseDataBase_1.BaseDatabase
                .connection(PostDatabase.TABLE_LIKES)
                .update(likeDB)
                .where("post_id", "=", `${likeDB.post_id}`)
                .andWhere("user_id", "=", `${likeDB.user_id}`);
        });
        this.delteLike = (postId) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase
                .connection(PostDatabase.TABLE_LIKES)
                .del()
                .where("post_id", "=", `${postId}`);
        });
        this.updatePost = (post) => __awaiter(this, void 0, void 0, function* () {
            const postDB = {
                post_id: post.getPostId(),
                creator_id: post.getCreatorId(),
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes(),
                post_created_at: post.getPostCreatedAt(),
                post_update_at: post.getPostUpdatedAt(),
                post_original_id: post.getPostOriginalId(),
                comments: post.getComments(),
                type_post: post.getTypePost()
            };
            yield BaseDataBase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .update(postDB)
                .where("post_id", "=", `${postDB.post_id}`);
        });
        this.deletePost = (postId) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase
                .connection(PostDatabase.TABLE_LIKES)
                .del()
                .where("post_id", "=", `${postId}`);
            yield BaseDataBase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .del()
                .where("post_id", "=", `${postId}`);
        });
    }
    getPosts(q) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            const typePost = Types_1.TYPE_POST.POST;
            if (q) {
                result = yield BaseDataBase_1.BaseDatabase
                    .connection(PostDatabase.TABLE_POSTS)
                    .select("post_id as postId", "creator_id as creatorId", "content", "likes", "dislikes", "post_created_at as postCreatedAt", "post_update_at as postUpdateAt", "name", "email", "post_original_id as postOriginalId", "comments", "type_post as typePost")
                    .innerJoin(PostDatabase.TABLE_USERS, "creator_id", "=", "user_id")
                    .where("post_id", "=", `${q}`)
                    .andWhere("type_post", "=", `${typePost}`);
            }
            else {
                result = yield BaseDataBase_1.BaseDatabase
                    .connection(PostDatabase.TABLE_POSTS)
                    .select("post_id as postId", "creator_id as creatorId", "content", "likes", "dislikes", "post_created_at as postCreatedAt", "post_update_at as postUpdateAt", "name", "email", "post_original_id as postOriginalId", "comments", "type_post as typePost")
                    .innerJoin(PostDatabase.TABLE_USERS, "creator_id", "=", "user_id")
                    .where("type_post", "=", `${typePost}`);
            }
            const allPosts = result.map((item) => {
                return new Post_1.Post(item.postId, item.creatorId, item.name, item.email, item.content, item.likes, item.dislikes, item.postCreatedAt, item.postUpdateAt, item.postOriginalId, item.comments, item.typePost);
            });
            return allPosts;
        });
    }
}
exports.PostDatabase = PostDatabase;
PostDatabase.TABLE_POSTS = "posts";
PostDatabase.TABLE_USERS = "users";
PostDatabase.TABLE_LIKES = "likes_dislikes";
//# sourceMappingURL=PostDataBase.js.map