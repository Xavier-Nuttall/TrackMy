-- ROOM INSERT STATEMENTS
INSERT INTO Room (threshold, room_name) VALUES (10, 'Conference Room A');

--USER INSERT STATEMENTS
INSERT INTO User (email_address, firstname, lastname, othernames) VALUES ('john.doe@example.com', 'John', 'Doe', NULL);

--USERTIMES INSERT STATEMENTS
INSERT INTO UserTimes (user_id, room_id, room_threshold, start_time, end_time) VALUES (1, 1, 10, '2024-04-10 08:00:00', '2024-04-10 10:00:00');

--LOGIN INSERT STATEMENTS
INSERT INTO Login (session_token, user_id) VALUES ('abc123xyz456', 1);

--ROOMTIME INSERT STATEMENTS
INSERT INTO RoomTime (room_id, occupancy, time, date) VALUES (1, 10, '2024-04-10 08:00:00', '2024-04-10');
