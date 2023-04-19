export const usersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
    )
`

export const postsTableQuery = `
    CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(100) NOT NULL REFERENCES users(name),
        post_name VARCHAR(100) NOT NULL,
        post_text TEXT NOT NULL,
        like_count INTEGER DEFAULT 0 NOT NULL,
        dislike_count INTEGER DEFAULT 0 NOT NULL
    )
`;

export const commentsTableQuery = `
    CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL REFERENCES posts(id),
        user_name VARCHAR(100) NOT NULL,
        comment_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )
`;

