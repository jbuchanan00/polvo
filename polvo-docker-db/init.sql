CREATE TABLE IF NOT EXISTS role (
    id BIGSERIAL PRIMARY KEY,
    role_name varchar(35)
);

CREATE TABLE IF NOT EXISTS app_user (
    id VARCHAR(36) PRIMARY KEY,
    first_name Text,
    last_name Text,
    email Text,
    username varchar(35),
    avatar_url TEXT,
    role_id int references role(id),
    location point,
    bio Text,
    UNIQUE(email, username)
);

CREATE TABLE IF NOT EXISTS auth_provider (
    id VARCHAR(36) PRIMARY KEY, 
    user_id VARCHAR(36) REFERENCES app_user(id) NOT NULL,
    provider TEXT NOT NULL,
    provider_user_id TEXT,
    email TEXT,
    UNIQUE(provider, provider_user_id)
);

CREATE TABLE IF NOT EXISTS native_auth (
    user_id VARCHAR(36) PRIMARY KEY REFERENCES app_user(id),
    hash Text,
    salt Text
);

CREATE TABLE IF NOT EXISTS refresh_token (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES app_user(id)
);

INSERT INTO role (role_name) VALUES ('canvas'), ('artist'), ('shop');