BEGIN;

INSERT INTO comic_collector_users (user_name, password)
VALUES
    ('user', 'password');

INSERT INTO comic_collector_collection (comic_title, comic_author, is_read, description, user_id)
VALUES
    ('title', 'author', false, 'description', 3),
    ('title2', 'author2', true, 'description2', 3),
    ('title3', 'author3', false, 'description3', 3);