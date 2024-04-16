CREATE SCHEMA pii;
CREATE SCHEMA tracking;

CREATE TABLE tracking.Room(
    room_id SERIAL PRIMARY KEY,
    room_name VARCHAR(200) NOT NULL,
    threshold INT NOT NULL
);

CREATE TABLE pii.User(
    user_id SERIAL PRIMARY KEY,
    email_address VARCHAR(255) NOT NULL UNIQUE,
    CHECK (email_address LIKE '%@%'),
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    othernames VARCHAR(200)
);

CREATE TABLE tracking.UserTimes(
    user_id INT,
    room_id INT,
    room_threshold INT NOT NULL,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usertimes_userid FOREIGN KEY(user_id) REFERENCES pii.User(user_id),
    CONSTRAINT fk_usertimes_roomid FOREIGN KEY(room_id) REFERENCES tracking.Room(room_id),

    PRIMARY KEY(user_id, room_id)
);

CREATE TABLE pii.Login(
    session_token VARCHAR(200),
    user_id INT,

    CONSTRAINT fk_login FOREIGN KEY(user_id) REFERENCES pii.User(user_id),
    
    PRIMARY KEY(session_token, user_id)
);

CREATE TABLE tracking.RoomTime(
    room_id INT NOT NULL,
    occupancy INT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date DATE NOT NULL,

    CONSTRAINT fk_roomtime FOREIGN KEY (room_id) REFERENCES tracking.Room(room_id),

    PRIMARY KEY (room_id, date, time)
);


