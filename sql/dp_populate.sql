-- ROOM INSERT STATEMENTS
INSERT INTO Room (threshold, room_name) VALUES (10, 'Conference Room A');
INSERT INTO Room (threshold, room_name) VALUES (300, 'Not A Giant Pit');
INSERT INTO Room (threshold, room_name) VALUES (20, 'Study Room A');
INSERT INTO Room (threshold, room_name) VALUES (25, 'Study Room B');
INSERT INTO Room (threshold, room_name) VALUES (30, 'Study Room C');
INSERT INTO Room (threshold, room_name) VALUES (50, 'Weights Room');
INSERT INTO Room (threshold, room_name) VALUES (10, 'Indoor Gymnasium 1');
INSERT INTO Room (threshold, room_name) VALUES (10, 'Indoor Gymnasium 2');

--USER INSERT STATEMENTS
INSERT INTO User (email_address, firstname, lastname, othernames) VALUES ('john.doe@example.com', 'John', 'Doe', NULL);
INSERT INTO User (email_address, firstname, lastname, othernames) VALUES ('jane.doe@example.com', 'Jane', 'Doe', NULL);
INSERT INTO User (email_address, firstname, lastname, othernames) VALUES ('lbowman@name.gen', 'Lacey', 'Bowman', NULL);
INSERT INTO User (email_address, firstname, lastname, othernames) VALUES ('pwhite@name.gen', 'Paul', 'White', NULL);
INSERT INTO User (email_address, firstname, lastname, othernames) VALUES ('aking@public.domain', 'Arthur', 'King', NULL);
INSERT INTO User (email_address, firstname, lastname, othernames) VALUES ('mycroft@gov.uk', 'Mycroft', 'Holmes', NULL);
INSERT INTO User (email_address, firstname, lastname, othernames) VALUES ('sherlock@public.domain', 'Sherlock', 'Holmes', NULL);

--USERTIMES INSERT STATEMENTS
INSERT INTO UserTimes (user_id, room_id, room_threshold, start_time, end_time) VALUES (1, 1, 10, '2024-04-10 08:00:00', '2024-04-10 10:00:00');
INSERT INTO UserTimes (user_id, room_id, room_threshold, start_time, end_time) VALUES (7, 3, 20, '2024-04-10 10:00:00', '2024-04-10 16:00:00');
INSERT INTO UserTimes (user_id, room_id, room_threshold, start_time, end_time) VALUES (4, 7, 10, '2024-04-10 11:00:00', '2024-04-10 14:00:00');

--LOGIN INSERT STATEMENTS
INSERT INTO Login (session_token, user_id) VALUES ('abc123xyz456', 1);
INSERT INTO Login (session_token, user_id) VALUES ('yXtybX0KhZko', 2);
INSERT INTO Login (session_token, user_id) VALUES ('y9Qq3CT0ijSZ', 5);
INSERT INTO Login (session_token, user_id) VALUES ('l9AKhdVviuw2', 4);
INSERT INTO Login (session_token, user_id) VALUES ('0eziScQwoHaQ', 3);
INSERT INTO Login (session_token, user_id) VALUES ('WjPAiyQjaIGt', 6);
INSERT INTO Login (session_token, user_id) VALUES ('BAhLjjCObhT8', 7);

--ROOMTIME INSERT STATEMENTS
INSERT INTO RoomTime (room_id, occupancy, time, date) VALUES (1, 10, '2024-04-10 08:00:00', '2024-04-10');
