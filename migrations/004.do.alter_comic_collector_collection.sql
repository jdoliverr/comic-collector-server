ALTER TABLE comic_collector_collection
ADD COLUMN issue INTEGER NOT NULL;

ALTER TABLE comic_collector_wishlist
ADD COLUMN issue INTEGER NOT NULL;