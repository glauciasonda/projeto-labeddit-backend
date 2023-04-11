"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(postId, creatorId, nameCreator, emailCreator, content, likes, dislikes, postCreatedAt, postUpdatedAt, postOriginalId, comments, typePost) {
        this.postId = postId;
        this.creatorId = creatorId;
        this.nameCreator = nameCreator;
        this.emailCreator = emailCreator;
        this.content = content;
        this.likes = likes;
        this.dislikes = dislikes;
        this.postCreatedAt = postCreatedAt;
        this.postUpdatedAt = postUpdatedAt;
        this.postOriginalId = postOriginalId;
        this.comments = comments;
        this.typePost = typePost;
    }
    getPostId() {
        return this.postId;
    }
    setPostId(value) {
        this.postId = value;
    }
    getCreatorId() {
        return this.creatorId;
    }
    setCreatorId(value) {
        this.creatorId = value;
    }
    getNameCreator() {
        return this.nameCreator;
    }
    getEmailCreator() {
        return this.emailCreator;
    }
    getContent() {
        return this.content;
    }
    setContent(value) {
        this.content = value;
    }
    getLikes() {
        return this.likes;
    }
    setLikes(value) {
        this.likes = value;
    }
    getDislikes() {
        return this.dislikes;
    }
    setDislikes(value) {
        this.dislikes = value;
    }
    getPostCreatedAt() {
        return this.postCreatedAt;
    }
    setPostCreatedAt(value) {
        this.postCreatedAt = value;
    }
    getPostUpdatedAt() {
        return this.postUpdatedAt;
    }
    setPostUpdatedAt(value) {
        this.postUpdatedAt = value;
    }
    getPostOriginalId() {
        return this.postOriginalId;
    }
    setPostOriginalId(value) {
        this.postOriginalId = value;
    }
    getComments() {
        return this.comments;
    }
    setComments(value) {
        this.comments = value;
    }
    getTypePost() {
        return this.typePost;
    }
    setTypePost(value) {
        this.typePost = value;
    }
}
exports.Post = Post;
//# sourceMappingURL=Post.js.map