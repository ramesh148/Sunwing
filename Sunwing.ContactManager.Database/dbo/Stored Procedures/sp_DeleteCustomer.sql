CREATE PROCEDURE [dbo].[sp_DeleteCustomer]
	@CustomerId INT,
	@ModifiedBy VARCHAR(50)
AS
BEGIN
	UPDATE c
	SET
		c.IsActive=0,
		c.ModifiedBy=@ModifiedBy,
		c.ModifiedDate=GETDATE()
	FROM dbo.Customer c
	WHERE (c.Id = @CustomerId)
END
