
CREATE TABLE gigs
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    technologies VARCHAR(255),
    budget VARCHAR(20),
    description TEXT,
    contact_email VARCHAR(50)
)