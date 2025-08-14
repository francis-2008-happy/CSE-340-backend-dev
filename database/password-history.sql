CREATE TABLE password_history (
    password_history_id SERIAL PRIMARY KEY,
    account_id INT NOT NULL,
    password_change_date TIMESTAMP NOT NULL DEFAULT NOW(),
    old_password VARCHAR(255) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);