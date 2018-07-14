CREATE TABLE [dbo].[Customer]
(
	[Id] INT NOT NULL identity, 
    [FirstName] NVARCHAR(50) NOT NULL, 
    [LastName] NVARCHAR(50) NOT NULL, 
    [BirthDay] DATETIME2 NULL, 
    [Email] NVARCHAR(100) NOT NULL,
	[IsActive] BIT NOT NULL DEFAULT 1,
	[CreatedBy] NVARCHAR(50) NULL, 
    [CreatedDate] DATETIME2 NULL, 
    [ModifiedBy] NVARCHAR(50) NULL, 
    [ModifiedDate] DATETIME2 NULL, 
    CONSTRAINT [PK_Customer] PRIMARY KEY ([Id])
)
