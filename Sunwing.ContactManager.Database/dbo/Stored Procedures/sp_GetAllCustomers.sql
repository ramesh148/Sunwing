CREATE PROCEDURE [dbo].[sp_GetAllCustomers]	
AS
BEGIN
	SELECT 
		c.FirstName,
		c.LastName,
		c.BirthDay,
		c.Email	
	FROM dbo.Customer c
	WHERE c.IsActive = 1
END