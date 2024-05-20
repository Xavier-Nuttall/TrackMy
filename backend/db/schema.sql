CREATE SCHEMA pii;
CREATE SCHEMA tracking;
CREATE TABLE tracking.Room(
    room_id int GENERATED BY DEFAULT AS IDENTITY (START WITH 0 MINVALUE 0) PRIMARY KEY,
    room_name VARCHAR(200) NOT NULL,
    threshold INT NOT NULL
);

CREATE TABLE pii.User(
    user_id CHAR(36) PRIMARY KEY,
    email_address VARCHAR(255) NOT NULL UNIQUE,
    CHECK (email_address LIKE '%@%'),
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL
);

CREATE TABLE tracking.UserTimes(
    user_id CHAR(36),
    room_id INT,
    room_threshold INT NOT NULL,
    start_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usertimes_userid FOREIGN KEY(user_id) REFERENCES pii.User(user_id),
    CONSTRAINT fk_usertimes_roomid FOREIGN KEY(room_id) REFERENCES tracking.Room(room_id),

    PRIMARY KEY(user_id, room_id)
);

CREATE TABLE pii.Login(
    session_token CHAR(36) NOT NULL UNIQUE,
    user_id CHAR(36),

    CONSTRAINT fk_login FOREIGN KEY(user_id) REFERENCES pii.User(user_id),
    
    PRIMARY KEY(session_token, user_id)
);

CREATE TABLE tracking.RoomTime(
    room_id INT NOT NULL,
    occupancy INT NOT NULL,
    time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_roomtime FOREIGN KEY (room_id) REFERENCES tracking.Room(room_id),

    PRIMARY KEY (room_id, time)
);

SELECT create_hypertable('tracking.RoomTime', 'time');


