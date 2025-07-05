CREATE TABLE IF NOT EXISTS role (
    id BIGSERIAL PRIMARY KEY,
    roleName varchar(35)
);

CREATE TABLE IF NOT EXISTS account (
    id varchar PRIMARY KEY,
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

CREATE TABLE IF NOT EXISTS loginMethod (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR
)

CREATE TABLE IF NOT EXISTS login (
    userId VARCHAR REFERENCES account(id),
    loginMethod BIGINT REFERENCES loginMethod(id),
    lastLogin TIMESTAMP
);

CREATE TABLE IF NOT EXISTS SESSION (
    id VARCHAR PRIMARY KEY,
    
);

INSERT INTO role (rolename) VALUES ('canvas'), ('artist'), ('shop');