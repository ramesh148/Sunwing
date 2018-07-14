using Sunwing.ContactManager.DataModel;

namespace Sunwing.ContactManager.DataAccess
{
    public interface IUnitOfWork
    {
        ContactManagerRepository<Customer> CustomerRepository { get; }
        ContactManagerRepository<Supplier> SupplierRepository { get; }

        void Save();
    }
}
