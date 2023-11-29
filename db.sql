-- Creating 'Episodes' table
CREATE TABLE episodes (
    episode_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    broadcast_date DATE,
    guest VARCHAR(100),
    img_url VARCHAR(255),
    youtube_url VARCHAR(255),
    painting_index VARCHAR(10)
);

-- Creating 'UniqueSubjects' table
CREATE TABLE unique_subjects (
    subject_id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

-- Creating 'UniqueColors' table
CREATE TABLE unique_colors (
    color_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    hex_code VARCHAR(7)
);

-- Creating 'Episode-Subject' join table
CREATE TABLE episode_subject (
    episode_id INT REFERENCES episodes(episode_id),
    subject_id INT REFERENCES unique_subjects(subject_id),
    PRIMARY KEY (episode_id, subject_id)
);

-- Creating 'Episode-Color' join table
CREATE TABLE episode_color (
    episode_id INT REFERENCES episodes(episode_id),
    color_id INT REFERENCES unique_colors(color_id),
    PRIMARY KEY (episode_id, color_id)
);

