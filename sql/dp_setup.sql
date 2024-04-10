-- create user
CREATE USER 'INFO310' IDENTIFIED BY 'password';
GRANT ALL ON *.* TO 'INFO310' WITH GRANT OPTION;

-- create database
DROP TABLE IF EXISTS Room;
DROP DATABASE INFO310PROJECT;

CREATE DATABASE INFO310PROJECT;
USE INFO310PROJECT;

CREATE TABLE Room(
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    threshold INT NOT NULL
);

CREATE TABLE RoomTime(
    room_id INT NOT NULL,
    CONSTRAINT fk_roomtime FOREIGN KEY (room_id) REFERENCES Room(room_id),
    occupancy INT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date DATE NOT NULL,
    PRIMARY KEY (room_id, date, time)
);

CREATE TABLE UserTimes(
    user_id INT,
    room_id INT,
    room_threshold INT NOT NULL,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usertimes_userid FOREIGN KEY(user_id) REFERENCES User(user_id),
    CONSTRAINT fk_usertimes_roomid FOREIGN KEY(room_id) REFERENCES Room(room_id),
    PRIMARY KEY(user_id, room_id);
);

CREATE TABLE User(
    user_id INT PRIMARY KEY,
    email_address VARCHAR(255) NOT NULL UNIQUE,
    CHECK (email_address LIKE '%@%'),
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    othernames VARCHAR(200),
);

CREATE TABLE Login(
    session_token VARCHAR(200),
    user_id INT,
    
    CONSTRAINT fk_login FOREIGN KEY(user_id) REFERENCES User(user_id),
    PRIMARY KEY(session_token, user_id),
);

