"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
class Like {
    constructor(userId, postId, like) {
        this.userId = userId;
        this.postId = postId;
        this.like = like;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getPostId() {
        return this.postId;
    }
    setPostId(value) {
        this.postId = value;
    }
    getLike() {
        return this.like;
    }
    setLike(value) {
        this.like = value;
    }
}
exports.Like = Like;
//# sourceMappingURL=Like.js.map