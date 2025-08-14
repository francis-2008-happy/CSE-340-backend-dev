CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    review_text TEXT NOT NULL,
    review_date TIMESTAMP NOT NULL DEFAULT NOW(),
    inv_id INT NOT NULL,
    account_id INT NOT NULL,
    FOREIGN KEY (inv_id) REFERENCES inventory(inv_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);