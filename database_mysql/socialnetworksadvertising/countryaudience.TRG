TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER after_country_audience_update\nAFTER UPDATE ON countryaudience\nFOR EACH ROW\nBEGIN\nSET @sum = (SELECT SUM(AudiencePercentage) FROM countryaudience WHERE ServiceID = NEW.ServiceID);\nIF @sum > 100 THEN\nSIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Percent sum should not be bigger 100%!\';\nEND IF;\nIF NEW.AudiencePercentage < 0 THEN\nSIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Audience percentage should be positive!\';\nEND IF;\nEND' 'CREATE DEFINER=`root`@`localhost` TRIGGER after_country_audience_insert\nAFTER INSERT ON countryaudience\nFOR EACH ROW\nBEGIN\nSET @sum = (SELECT SUM(AudiencePercentage) FROM countryaudience WHERE ServiceID = NEW.ServiceID);\nIF @sum > 100 THEN\nSIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Percent sum should not be bigger 100%!\';\nEND IF;\nIF NEW.AudiencePercentage < 0 THEN\nSIGNAL SQLSTATE \'45001\' SET MESSAGE_TEXT = \'Audience percentage should be positive!\';\nEND IF;\nEND'
sql_modes=1342177280 1342177280
definers='root@localhost' 'root@localhost'
client_cs_names='utf8mb4' 'utf8mb4'
connection_cl_names='utf8mb4_unicode_ci' 'utf8mb4_unicode_ci'
db_cl_names='utf8mb4_unicode_ci' 'utf8mb4_unicode_ci'
