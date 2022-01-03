USE phonedb;
INSERT INTO phones VALUES('p1','Apple iPhone 12 Mini','Red','64 GB',729.00,'Apple iPhone 12 Mini. Cinema-grade Dolby Vision video recording, and playback.','Apple','images/pid_1/1.png');
INSERT INTO phones VALUES('p2','Apple iPhone 12','Green','64 GB',829.00,'Apple iPhone 12. Cinema-grade Dolby Vision video recording, and playback.','Apple','images/pid_2/1.png');
INSERT INTO phones VALUES('p3','Apple iPhone 12 Pro','Gold','256 GB',1099.00, 'Apple iPhone 12 Pro. Cinema-grade Dolby Vision video recording, and playback.','Apple','images/pid_3/1.png');
INSERT INTO phones VALUES('p4','Apple iPhone 12 Pro max','Graphite', '256 GB',1099.00, 'Apple iPhone 12 Pro max. Cinema-grade Dolby Vision video recording, and playback.','Apple','images/pid_4/1.png');
INSERT INTO phones VALUES('p5','Samsung S21 Ultra','White', '128 GB',999.00, 'Samsung S21 Ultra. Cinema-grade Dolby Vision video recording, and playback.','Samsung','images/pid_5/1.png');
INSERT INTO phones VALUES('p6','Samsung S21','Pink', '128 GB',719.00, 'Samsung S21. Cinema-grade Dolby Vision video recording, and playback.','Samsung','images/pid_6/1.png');
INSERT INTO phones VALUES('p7','Samsung S21','Black', '128 GB', 719.00, 'Samsung S21. Cinema-grade Dolby Vision video recording, and playback.','Samsung','images/pid_7/1.png');
INSERT INTO phones VALUES('p8','Samsung S20 FE','Orange', '64 GB',450.00, 'Samsung S20 FE. Cinema-grade Dolby Vision video recording, and playback.','Samsung','images/pid_8/1.png');
INSERT INTO phones VALUES('p9','Samsung S20 FE','Red', '64 GB',299.00, 'Samsung S20 FE. Cinema-grade Dolby Vision video recording, and playback.','Samsung','images/pid_9/1.png');
INSERT INTO phones VALUES('p10','Samsung S20 FE','navy', '64 GB',1799.00, 'Samsung S20 FE. Cinema-grade Dolby Vision video recording, and playback.','Samsung','images/pid_10/1.png');

INSERT INTO creditcards VALUES('cc1', 'James Brown', '2022/01/20');
INSERT INTO creditcards VALUES('cc2', 'Ryan Corden', '2022/02/21');
INSERT INTO creditcards VALUES('cc3', 'Jimmy Harden', '2022/03/22');

INSERT INTO customers VALUES(1,'James', 'Brown', 'cc1', '530 White Ave., Los Angeles, CA 91701', 'jbrown@ics185.edu', '7141234567');
INSERT INTO customers VALUES(2,'Ryan', 'Corden', 'cc2', '530 White Ave., Los Angeles, CA 91701', 'rcorden@ics185.edu', '6573334444');
INSERT INTO customers VALUES(3,'Jimmy', 'Harden', 'cc3', '530 White Ave., Los Angeles, CA 91701', 'jharden@ics185.edu', '1112223333');

INSERT INTO sales VALUES(1,'jbrown@ics185.edu','p1',1,'2021/04/27');
INSERT INTO sales VALUES(2,'jbrown@ics185.edu','p2',3,'2021/04/28');
INSERT INTO sales VALUES(3,'jbrown@ics185.edu','p3',1,'2021/04/29');
INSERT INTO sales VALUES(4,'jbrown@ics185.edu','p4',2,'2021/04/30');
INSERT INTO sales VALUES(5,'jbrown@ics185.edu','p5',1,'2021/05/01');
INSERT INTO sales VALUES(6,'jbrown@ics185.edu','p6',1,'2021/05/02');

INSERT INTO ratings VALUES('p1',4.5,50);
INSERT INTO ratings VALUES('p2',4.8,49);
INSERT INTO ratings VALUES('p3',2.9,51);
INSERT INTO ratings VALUES('p4',3.4,52);
INSERT INTO ratings VALUES('p5',3.0,53);
INSERT INTO ratings VALUES('p6',3.9,54);
INSERT INTO ratings VALUES('p7',2.9,55);
INSERT INTO ratings VALUES('p8',1.9,56);
INSERT INTO ratings VALUES('p9',2.5,57);
INSERT INTO ratings VALUES('p10',3.8,58);



