"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likesTableQuery = exports.commentsTableQuery = exports.postsTableQuery = exports.usersTableQuery = void 0;
exports.usersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
    )
`;
exports.postsTableQuery = `
    CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(100) NOT NULL REFERENCES users(name),
        post_name VARCHAR(100) NOT NULL,
        post_text TEXT NOT NULL,
        created_at VARCHAR(100) NOT NULL
    )
`;
exports.commentsTableQuery = `
    CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL REFERENCES posts(id),
        user_name VARCHAR(100) NOT NULL,
        comment_text TEXT NOT NULL,
        created_at VARCHAR(100) NOT NULL
    )
`;
exports.likesTableQuery = `
    CREATE TABLE IF NOT EXISTS likes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        post_id INTEGER NOT NULL REFERENCES posts(id),
        type VARCHAR(10) NOT NULL CHECK (type IN ('like', 'dislike')),
        created_at VARCHAR(100) NOT NULL
    );
`;
