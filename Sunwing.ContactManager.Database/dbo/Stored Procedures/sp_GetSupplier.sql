CREATE PROCEDURE [dbo].[sp_GetSupplier]
	@SupplierId INT
AS
BEGIN
	SELECT 
		s.FirstName,
		s.LastName,		
		s.Telephone	
	FROM dbo.Supplier s
	WHERE s.Id = @SupplierId AND s.IsActive = 1
END
