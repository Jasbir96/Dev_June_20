CREATE TABLE IF NOT EXISTS user(
    uid  VARCHAR(255) PRIMARY KEY ,
    name VARCHAR(255) NOT NULL,
    phone  BIGINT NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    handle VARCHAR(30) NOT NULL UNIQUE,
    bio VARCHAR(150),
    is_verified Boolean DEFAULT false,
    is_public Boolean DEFAULT true
);
CREATE TABLE IF NOT EXISTS user_follower
(user_id VARCHAR(255)  NOT NULL ,
follower_id VARCHAR(255) NOT NULL,
is_accepted Boolean DEFAULT false,
INDEX (user_id)
);