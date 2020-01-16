TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER `after_user_types_insert` AFTER INSERT ON `usertypes` FOR EACH ROW BEGIN\nSET @count = (SELECT COUNT(TypeID) FROM usertypes WHERE TypeName = NEW.TypeName);\nIF @count > 1 THEN\nSIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Type with this name exists!\';\nEND IF;\nEND' 'CREATE DEFINER=`root`@`localhost` TRIGGER `after_user_types_update` AFTER UPDATE ON `usertypes` FOR EACH ROW BEGIN\nSET @count = (SELECT COUNT(TypeID) FROM usertypes WHERE TypeName = NEW.TypeName);\nIF @count > 1 THEN\nSIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Type with this name exists!\';\nEND IF;\nEND'
sql_modes=1342177280 1342177280
definers='root@localhost' 'root@localhost'
client_cs_names='utf8mb4' 'utf8mb4'
connection_cl_names='utf8mb4_unicode_ci' 'utf8mb4_unicode_ci'
db_cl_names='utf8mb4_unicode_ci' 'utf8mb4_unicode_ci'
