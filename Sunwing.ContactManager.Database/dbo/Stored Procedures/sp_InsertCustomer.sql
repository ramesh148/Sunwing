CREATE PROCEDURE [dbo].[sp_InsertCustomer]
	@CustomerId INT , 
    @FirstName NVARCHAR(50), 
    @LastName NVARCHAR(50) , 
    @BirthDay DATETIME2 , 
    @Email NVARCHAR(100) ,	
	@CreatedBy NVARCHAR(50)
AS
BEGIN
		Declare @RecordExists BIT=0;

		SELECT @RecordExists = 1
		FROM dbo.Customer c
		WHERE c.id = @customerId;

		IF (@RecordExists = 0)
		BEGIN
			UPDATE c
			SET 
				c.FirstName = @FirstName,
				c.LastName = @LastName,
				c.BirthDay=@BirthDay,
				c.Email = @Email,
				c.ModifiedBy=@CreatedBy,
				c.ModifiedDate=GETDATE()
			FROM dbo.Customer c
			WHERE (c.Id = @customerId)

			IF @@ROWCOUNT = 0
			BEGIN
				INSERT INTO dbo.Customer (
					[FirstName],
					[LastName],
					[BirthDay],		
					[Email],
					[CreatedBy],
					[CreatedDate]
				) VALUES (
						@FirstName,
						@LastName,
						@BirthDay,
						@Email,
						@CreatedBy,
						GETDATE()
				)
			END

			SELECT 
				c.Id,
				c.FirstName,
				c.LastName,
				c.BirthDay,
				c.Email			
			FROM dbo.Customer c
			WHERE c.Id = @customerId
		END
	END
	