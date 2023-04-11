"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userId, name, email, password, role, userCreatedAt) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.userCreatedAt = userCreatedAt;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getName() {
        return this.name;
    }
    setName(value) {
        this.name = value;
    }
    getEmail() {
        return this.email;
    }
    setEmail(value) {
        this.email = value;
    }
    getPassword() {
        return this.password;
    }
    setPassword(value) {
        this.password = value;
    }
    getRole() {
        return this.role;
    }
    setRole(value) {
        this.role = value;
    }
    getUserCreatedAt() {
        return this.userCreatedAt;
    }
    setUserCreatedAt(value) {
        this.userCreatedAt = value;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map