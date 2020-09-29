CREATE TABLE IF NOT EXISTS user(
    id  VARCHAR(255) PRIMARY KEY ,
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
PRIMARY KEY (user_id, follower_id),
INDEX (user_id)
);
CREATE TABLE IF NOT EXISTS POST (
    id VARCHAR(255) PRIMARY KEY,
    created_at DATETIME NOT NULL,
    author_id VARCHAR(80) NOT NULL,
    descp VARCHAR(255),
    p_img_url VARCHAR(255) NOT NULL,
    INDEX (author_id) 
)

CREATE TABLE IF NOT EXISTS user_following (
   u_id VARCHAR(255) NOT NULL,
   following_id  VARCHAR(255) NOT NULL ,
   PRIMARY KEY (u_id, following_id),
   INDEX(u_id)
)