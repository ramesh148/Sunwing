CREATE PROCEDURE [dbo].[sp_GetCustomer]
	@CustomerId INT
AS
BEGIN
	SELECT 
		c.FirstName,
		c.LastName,
		c.BirthDay,
		c.Email	
	FROM dbo.Customer c
	WHERE c.Id = @CustomerId AND c.IsActive = 1
END	