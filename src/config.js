module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgreql://comic_admin@localhost/comic-collector',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgreql://comic_admin@localhost/comic-collector-test',
  }