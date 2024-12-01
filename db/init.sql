CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    sent BOOLEAN DEFAULT FALSE
);

INSERT INTO notifications (email, message) VALUES
('test1@example.com', 'This is a test message'),
('test2@example.com', 'Another test message');
