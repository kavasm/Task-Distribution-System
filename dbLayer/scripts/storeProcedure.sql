
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_aInsertClient')
DROP PROCEDURE [dbo].[sp_aInsertClient]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_aInsertClient]
	@IpAddress varchar(100),
	@HostName varchar(50),
	@UserName varchar(50)
AS

DECLARE @NEWID int

INSERT INTO ClientTable
	(HostName,
	UserName,
	IpAddress)
VALUES
	(@HostName,
	@UserName,
	@IpAddress)

SET @NEWID = SCOPE_IDENTITY()

--Return values
SELECT ID, HostName, UserName, IpAddress
FROM ClientTable WHERE ID = @NEWID
GO
---==========================================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetClientList')
DROP PROCEDURE [dbo].[sp_GetClientList]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetClientList]
AS
SELECT ID, HostName, UserName, IpAddress
FROM ClientTable 
GO
---==========================================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_UpdateClient')
DROP PROCEDURE [dbo].[sp_UpdateClient]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateClient]
	@ID int,
	@IpAddress varchar(100),
	@HostName varchar(50),
	@UserName varchar(50)
AS
BEGIN
UPDATE ClientTable
SET
    IpAddress = @IpAddress,
	HostName = @HostName,
	UserName = @UserName
	WHERE ID = @Id

--Return values
SELECT ID, HostName, UserName, IpAddress
FROM ClientTable WHERE ID = @Id

END
GO
--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_DeleteClient')
DROP PROCEDURE [dbo].[sp_DeleteClient]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DeleteClient]
	 @id int
AS
BEGIN
	DELETE FROM ClientTable
	WHERE ID = @id
END
GO
--=============================================================================================

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_aInsertNode')
DROP PROCEDURE [dbo].[sp_aInsertNode]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_aInsertNode]
	@IpAddress varchar(100),
	@NodePort varchar(50),
	@NodeStatus varchar(50),
	@NodeName varchar(50)
AS

DECLARE @NEWID int
BEGIN
    IF EXISTS (SELECT 1 FROM NodeTable
    WHERE NodeIp = @IpAddress AND NodePort = @NodePort
	)
    BEGIN
       UPDATE NodeTable
     SET
    NodeIp = @IpAddress,
	NodePort = @NodePort,
	NodeStatus = @NodeStatus,
	NodeName = @NodeName
	WHERE NodeIp = @IpAddress AND NodePort = @NodePort
	--Return values
	SELECT NodeId, NodePort, NodeIp
FROM NodeTable WHERE NodeIp = @IpAddress AND NodePort = @NodePort
    END
ELSE
    BEGIN
    INSERT INTO NodeTable
	(NodePort,
	NodeStatus,
	NodeIp,
	NodeName)
VALUES
	(@NodePort,
	@NodeStatus,
	@IpAddress,
	@NodeName)

SET @NEWID = SCOPE_IDENTITY()
    END
END

--Return values
SELECT NodeId, NodePort, NodeIp
FROM NodeTable WHERE NodeId = @NEWID
GO
--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_UpdateNode')
DROP PROCEDURE [dbo].[sp_UpdateNode]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateNode]
	@Id int,
    @IpAddress varchar(100),
	@NodePort varchar(50),
	@NodeStatus varchar(50),
	@NodeName varchar(50)
AS
BEGIN
UPDATE NodeTable
SET
    NodeIp = @IpAddress,
	NodePort = @NodePort,
	NodeStatus = @NodeStatus,
	NodeName = @NodeName
	WHERE NodeId = @Id

--Return values
SELECT NodeId, NodePort, NodeIp, NodeName
FROM NodeTable WHERE NodeId = @Id

END
GO
--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetNodeList')
DROP PROCEDURE [dbo].[sp_GetNodeList]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetNodeList]
AS
SELECT NodeId, NodeIp, NodePort, NodeStatus
FROM NodeTable 
GO

--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetAvailableNodes')
DROP PROCEDURE [dbo].[sp_GetAvailableNodes]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetAvailableNodes]
AS
SELECT TOP 1 * 
FROM NodeTable 
WHERE NodeStatus = 'Available'
GO
--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_DeleteNode')
DROP PROCEDURE [dbo].[sp_DeleteNode]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DeleteNode]
	 @id int
AS
BEGIN
	DELETE FROM NodeTable
	WHERE NodeId = @id
END
GO
--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_aInsertTask')
DROP PROCEDURE [dbo].[sp_aInsertTask]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_aInsertTask]
	@taskName varchar(50),
	@clientId int,
	@taskParameters varchar(500)
AS

DECLARE @NEWID int

INSERT INTO TaskTable
	(TaskName,
	ClientId,
	TaskParmeters)
VALUES
	(@taskName,
	@clientId,
	@taskParameters)

SET @NEWID = SCOPE_IDENTITY()

--Return values
SELECT TaskName, TaskId, ClientId, TaskParmeters
FROM TaskTable WHERE TaskId = @NEWID
GO
--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_DeleteTask')
DROP PROCEDURE [dbo].[sp_DeleteTask]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DeleteTask]
	 @id int
AS
BEGIN
	DELETE FROM TaskTable
	WHERE TaskId = @id
END
GO
--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_UpdateTask')
DROP PROCEDURE [dbo].[sp_UpdateTask]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateTask]
	@Id int,
    @taskName varchar(50),
	@clientId int,
	@taskParameters varchar(500)
AS
BEGIN
UPDATE TaskTable
SET
    TaskName = @taskName,
	ClientId = @clientId,
	TaskParmeters = @taskParameters
	WHERE TaskId = @Id

--Return values
SELECT TaskName, ClientId, TaskParmeters
FROM TaskTable WHERE TaskId = @Id

END
GO

--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_UpdateTaskResult')
DROP PROCEDURE [dbo].[sp_UpdateTaskResult]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateTaskResult]
	@Id int,
    @taskResult varchar(max),
	@resultStatus varchar(50)
AS
BEGIN
UPDATE TaskTable
SET
    TaskResult = @taskResult,
	ResultStatus = @resultStatus
	WHERE TaskId = @Id

--Return values
SELECT * FROM TaskTable WHERE TaskId = @Id

END
GO
--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_SetTaskStatus')
DROP PROCEDURE [dbo].[sp_SetTaskStatus]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_SetTaskStatus]
	@Id int,
    @TaskStatus varchar(50)
AS
BEGIN
UPDATE TaskTable
SET
  TaskStatus = @TaskStatus
	WHERE TaskId = @Id

--Return values
SELECT TaskName, ClientId, TaskParmeters, TaskStatus
FROM TaskTable WHERE TaskId = @Id

END
GO

--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetTaskByClientId')
DROP PROCEDURE [dbo].[sp_GetTaskByClientId]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetTaskByClientId]
	@ClientId int
AS
SELECT *
FROM TaskTable WHERE ClientId = @ClientId

GO

--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetTaskById')
DROP PROCEDURE [dbo].[sp_GetTaskById]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetTaskById]
	@TaskId int
AS
SELECT *
FROM TaskTable WHERE TaskId = @TaskId

GO
--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetTaskByStatus')
DROP PROCEDURE [dbo].[sp_GetTaskByStatus]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetTaskByStatus]
	@TaskStatus int
AS
SELECT *
FROM TaskTable WHERE TaskStatus = @TaskStatus

GO
--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_GetTaskByNodeId')
DROP PROCEDURE [dbo].[sp_GetTaskByNodeId]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetTaskByNodeId]
	@NodeId int
AS
SELECT *
FROM TaskTable WHERE NodeId = @NodeId

GO
--=============================================================================================
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_AssignNode')
DROP PROCEDURE [dbo].[sp_AssignNode]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_AssignNode]
	@Id int,
    @NodeId int
AS
BEGIN
UPDATE TaskTable
SET
NodeId = @NodeId
	WHERE TaskId = @Id

--Return values
SELECT * FROM TaskTable WHERE TaskId = @Id
END
GO
