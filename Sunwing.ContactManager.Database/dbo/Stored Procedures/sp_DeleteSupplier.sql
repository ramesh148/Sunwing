CREATE PROCEDURE [dbo].[sp_DeleteSupplier]
	@SupplierId INT,
	@ModifiedBy VARCHAR(50)
AS
BEGIN
	UPDATE s
	SET
		s.IsActive=0,
		s.ModifiedBy=@ModifiedBy,
		s.ModifiedDate=GETDATE()
	FROM dbo.Supplier s
	WHERE (s.Id = @SupplierId)
END
