TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER `after_genders_insert` AFTER INSERT ON `genders` FOR EACH ROW BEGIN\nSET @count = (SELECT COUNT(GenderID) FROM genders WHERE GenderName = NEW.GenderName);\nIF @count > 1 THEN\nSIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Gender with this name exists!\';\nEND IF;\nEND' 'CREATE DEFINER=`root`@`localhost` TRIGGER `after_genders_update` AFTER UPDATE ON `genders` FOR EACH ROW BEGIN\nSET @count = (SELECT COUNT(GenderID) FROM genders WHERE GenderName = NEW.GenderName);\nIF @count > 1 THEN\nSIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Gender with this name exists!\';\nEND IF;\nEND'
sql_modes=1342177280 1342177280
definers='root@localhost' 'root@localhost'
client_cs_names='utf8mb4' 'utf8mb4'
connection_cl_names='utf8mb4_unicode_ci' 'utf8mb4_unicode_ci'
db_cl_names='utf8mb4_unicode_ci' 'utf8mb4_unicode_ci'
