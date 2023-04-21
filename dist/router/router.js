"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller/controller");
exports.router = express_1.default.Router();
exports.router.post("/registration", controller_1.Controller.registration);
exports.router.post("/login", controller_1.Controller.login);
exports.router.post("/create-post", controller_1.Controller.createPost);
exports.router.get("/posts", controller_1.Controller.posts);
exports.router.post("/create-comment", controller_1.Controller.createComment);
exports.router.get("/post/:postId", controller_1.Controller.postById);
exports.router.post("/like", controller_1.Controller.like);
exports.router.post("/dislike", controller_1.Controller.dislike);
exports.router.post("/delete-user", controller_1.Controller.deleteUser);
