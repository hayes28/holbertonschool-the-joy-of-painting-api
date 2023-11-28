-- Creating 'Episodes' table
CREATE TABLE episodes (
    episode_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    broadcast_date DATE,
    guest VARCHAR(100)
);

-- Creating 'Subjects' table
CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    name VARCHAR(20)
);

-- Creating 'Colors' table
CREATE TABLE colors (
    color_id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    hex_code VARCHAR(7)
);

-- Creating 'Episode-Subject' join table
CREATE TABLE episode_subject (
    episode_id INT REFERENCES episodes(episode_id),
    subject_id INT REFERENCES subjects(subject_id),
    PRIMARY KEY (episode_id, subject_id)
);

-- Creating 'Episode-Color' join table
CREATE TABLE episode_color (
    episode_id INT REFERENCES episodes(episode_id),
    color_id INT REFERENCES colors(color_id),
    PRIMARY KEY (episode_id, color_id)
);
