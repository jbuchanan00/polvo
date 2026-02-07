CREATE TABLE IF NOT EXISTS role (
    id BIGSERIAL PRIMARY KEY,
    role_name varchar(35)
);

CREATE TABLE IF NOT EXISTS shop (
    id VARCHAR(36) PRIMARY KEY,
    name TEXT,
    location point
);

CREATE TABLE IF NOT EXISTS app_user (
    id VARCHAR(36) PRIMARY KEY,
    first_name Text,
    last_name Text,
    email Text,
    username varchar(35),
    avatar_extension TEXT,
    role_id int references role(id),
    location point,
    bio Text,
    shop_id VARCHAR(36) REFERENCES shop(id),
    UNIQUE(email, username)
);

CREATE TABLE IF NOT EXISTS auth_provider (
    id VARCHAR(36) PRIMARY KEY, 
    user_id VARCHAR(36) REFERENCES app_user(id) NOT NULL,
    provider TEXT NOT NULL,
    provider_user_id TEXT,
    email TEXT,
    UNIQUE(provider, user_id)
);

CREATE TABLE IF NOT EXISTS native_auth (
    user_id VARCHAR(36) PRIMARY KEY REFERENCES app_user(id),
    hash Text,
    salt Text
);

CREATE TABLE IF NOT EXISTS meta_lltokens (
    user_id VARCHAR(36) PRIMARY KEY REFERENCES app_user(id),
    token Text,
    iv Text,
    tag Text
);



INSERT INTO role (role_name) VALUES ('canvas'), ('artist'), ('shop');

-- Users
INSERT INTO app_user (id, first_name, last_name, email, username, avatar_extension, role_id, location, bio) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Ava', 'Smith', 'ava.smith@example.com', 'ava_s', 'png', 1, POINT(40.4136, -111.8725), 'Tattoo enthusiast, always looking for new ink.'),
    ('22222222-2222-2222-2222-222222222222', 'Leo', 'Garcia', 'leo.garcia@example.com', 'inkedbyleo', 'png', 2, POINT(40.2457, -111.6457), 'Blackwork artist specializing in geometric designs.'),
    ('33333333-3333-3333-3333-333333333333', 'Maya', 'Kim', 'maya.kim@example.com', 'maya_k', 'png', 3, POINT(40.7776, -111.9311), 'Shop owner and piercer based in NYC.');

-- Auth providers (Google + GitHub)
INSERT INTO auth_provider (id, user_id, provider, provider_user_id, email) VALUES
    ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '11111111-1111-1111-1111-111111111111', 'google', 'google-ava-123', 'ava.smith@example.com'),
    ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '22222222-2222-2222-2222-222222222222', 'github', 'gh-leo-456', 'leo.garcia@example.com');

-- Native auth (password-based)
INSERT INTO native_auth (user_id, hash, salt) VALUES
    ('33333333-3333-3333-3333-333333333333', 'hashedpassword123456', 'randomsalt789');

-- Shops
INSERT INTO shop (id, name, location) VALUES
    ('44444444-4444-4444-4444-444444444444', 'Downtown Ink Collective', POINT(40.7776, -111.9311)),
    ('55555555-5555-5555-5555-555555555555', 'Silverline Tattoos', POINT(40.7776, -111.9311));