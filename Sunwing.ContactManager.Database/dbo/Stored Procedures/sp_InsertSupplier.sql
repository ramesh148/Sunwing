CREATE PROCEDURE [dbo].[sp_InsertSupplier]
	@SupplierId INT , 
    @FirstName NVARCHAR(50), 
    @LastName NVARCHAR(50) ,
    @Telephone NVARCHAR(12) ,	
	@CreatedBy NVARCHAR(50)
AS
BEGIN
		Declare @RecordExists BIT=0;

		SELECT @RecordExists = 1
		FROM dbo.Supplier s
		WHERE s.id = @SupplierId;

		IF (@RecordExists = 0)
		BEGIN
			UPDATE s
			SET 
				s.FirstName = @FirstName,
				s.LastName = @LastName,				
				s.Telephone = @Telephone,
				s.ModifiedBy=@CreatedBy,
				s.ModifiedDate=GETDATE()
			FROM dbo.Supplier s
			WHERE (s.Id = @SupplierId)

			IF @@ROWCOUNT = 0
			BEGIN
				INSERT INTO dbo.Supplier (
					[FirstName],
					[LastName],							
					[Telephone],
					[CreatedBy],
					[CreatedDate]
				) VALUES (
						@FirstName,
						@LastName,						
						@Telephone,
						@CreatedBy,
						GETDATE()
				)
			END

			SELECT 
				s.Id,
				s.FirstName,
				s.LastName,				
				s.Telephone			
			FROM dbo.Supplier s
			WHERE s.Id = @SupplierId
		END
	END
