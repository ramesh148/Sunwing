using Sunwing.ContactManager.DataModel;
using System.Collections.Generic;

namespace Sunwing.ContactManager.Business
{
    public interface ISupplierService
    {
        Supplier Create(Supplier supplier);
        void Delete(Supplier supplier);
        void Delete(int Id);
        IEnumerable<Supplier> Get();
        Supplier GetById(int Id);
        Supplier Update(Supplier supplier);
    }
}
