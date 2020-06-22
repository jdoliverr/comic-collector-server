CREATE TABLE comic_collector_collection (
    id SERIAL PRIMARY KEY,
    comic_title TEXT NOT NULL,
    comic_author TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    description TEXT,
    user_id INTEGER 
        REFERENCES comic_collector_users(id) ON DELETE CASCADE NOT NULL
);