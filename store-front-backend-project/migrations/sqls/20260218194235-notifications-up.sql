/* Replace with your SQL commands */

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT, 
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    title VARCHAR(255),
    message TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);