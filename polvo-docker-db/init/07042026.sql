

CREATE TABLE IF NOT EXISTS integrated_instagram_post(
    id TEXT PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES app_user(id) NOT NULL
);