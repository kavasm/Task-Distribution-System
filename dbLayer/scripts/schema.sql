IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ClientTable]') AND type in (N'U'))
BEGIN
	create table ClientTable
	(
		ID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
		HostName varchar(50),
        UserName varchar(50),
		IpAddress varchar(100),
	)
END
GO
---==========================================================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TaskTable]') AND type in (N'U'))
BEGIN
	create table TaskTable
	(
		TaskId int IDENTITY(1,1) NOT NULL PRIMARY KEY,
		TaskName varchar(50),
		NodeId int,
		ClientId int,
		TaskStatus varchar(50),
		TaskParmeters varchar(500),
		TaskResult varchar(max),
		ResultStatus varchar(50)

	)
END
GO
---==========================================================================================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[NodeTable]') AND type in (N'U'))
BEGIN
	create table NodeTable
	(
		NodeId int IDENTITY(1,1) NOT NULL PRIMARY KEY,
		NodeName varchar(50),
        NodePort varchar(50),
	    NodeIp varchar(100),
		NodeStatus varchar(50)
	)
END
GO