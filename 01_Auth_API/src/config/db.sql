/* Tables example */
use 01_AUTH;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS JWT_tokens (
    id SERIAL PRIMARY KEY,
    refresh_token VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id)
);

