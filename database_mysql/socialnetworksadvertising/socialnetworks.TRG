TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER `after_social_networks_insert` AFTER INSERT ON `socialnetworks` FOR EACH ROW BEGIN\nSET @count = (SELECT COUNT(SocialNetworkID) FROM socialnetworks WHERE NetworkName = NEW.NetworkName);\nIF @count > 1 THEN\nSIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Network with this name exists!\';\nEND IF;\nEND' 'CREATE DEFINER=`root`@`localhost` TRIGGER `after_social_networks_update` AFTER UPDATE ON `socialnetworks` FOR EACH ROW BEGIN\nSET @count = (SELECT COUNT(SocialNetworkID) FROM socialnetworks WHERE NetworkName = NEW.NetworkName);\nIF @count > 1 THEN\nSIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Network with this name exists!\';\nEND IF;\nEND'
sql_modes=1342177280 1342177280
definers='root@localhost' 'root@localhost'
client_cs_names='utf8mb4' 'utf8mb4'
connection_cl_names='utf8mb4_unicode_ci' 'utf8mb4_unicode_ci'
db_cl_names='utf8mb4_unicode_ci' 'utf8mb4_unicode_ci'
