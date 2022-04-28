CREATE ROLE justt_tester LOGIN
  password '123456789';
GRANT justtuser TO justt_tester;

CREATE ROLE justt_loader LOGIN INHERIT password '123456789';
GRANT justt_data_loader TO justt_loader;



