CREATE TABLE IF NOT EXISTS role (
    id BIGSERIAL PRIMARY KEY,
    roleName varchar(35)
);

CREATE TABLE IF NOT EXISTS account (
    id BIGSERIAL PRIMARY KEY,
    firstName Text,
    lastName Text,
    email Text,
    username varchar(35),
    key Text,
    roleId int references role(id),
    location point,
    bio Text
);

CREATE TABLE IF NOT EXISTS authentication (
    userId bigint PRIMARY KEY REFERENCES account(id),
    hash Text,
    salt Text
);

INSERT INTO role (rolename) VALUES ('canvas'), ('artist'), ('shop');