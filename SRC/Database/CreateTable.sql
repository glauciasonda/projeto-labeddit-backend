-- Active: 1678479911146@@127.0.0.1@3306
CREATE TABLE users (
    user_id STRING PRIMARY KEY UNIQUE NOT NULL, 
    name STRING NOT NULL, 
    email STRING NOT NULL,
    password STRING NOT NULL, 
    role STRING, 
    user_created_at STRING NOT NULL 
);

CREATE TABLE posts (
    post_id STRING PRIMARY KEY UNIQUE NOT NULL, 
    creator_id STRING NOT NULL, 
    content STRING NOT NULL, 
    likes INTEGER, 
    dislikes INTEGER, 
    post_created_at STRING NOT NULL,  
    post_update_at STRING,
    post_original_id STRING, 
    comments INTEGER,
    type_post INTEGER,
    FOREIGN KEY (creator_id) REFERENCES users(user_id)
    FOREIGN KEY (post_original_id) REFERENCES posts(post_id)
);

CREATE TABLE likes_dislikes ( 
    user_id STRING  NOT NULL, 
    post_id STRING  NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

select * from posts;
select * from users;