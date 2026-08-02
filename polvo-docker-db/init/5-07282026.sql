CREATE TABLE instagram_info (
    instagram_id TEXT PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES app_user(id) NOT NULL,
    username TEXT
);