CREATE PROCEDURE [dbo].[sp_GetAllSuppliers]
AS
BEGIN
	SELECT 
		s.FirstName,
		s.LastName,		
		s.Telephone	
	FROM dbo.Supplier s
	WHERE s.IsActive = 1
END
