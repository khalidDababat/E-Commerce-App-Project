/* Replace with your SQL commands */

ALTER TABLE IF EXISTS users
ADD COLUMN reset_token TEXT,
ADD COLUMN reset_token_expiration TIMESTAMP;