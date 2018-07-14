using Sunwing.ContactManager.DataModel;
using System.Collections.Generic;

namespace Sunwing.ContactManager.Business
{
    public interface ICustomerService
    {
        Customer Create(Customer customer);
        void Delete(Customer customer);
        void Delete(int Id);
        IEnumerable<Customer> Get();
        Customer GetById(int Id);
        Customer Update(Customer customer);
    }
}
